import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ContentType, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { UpsertResourceDto } from "./dto";
import { contentResourceTypes, isStandaloneResource } from "./resource-map";

import { TranslationService } from "./translation.service";

@Injectable()
export class CmsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translationService: TranslationService,
  ) {}

  private parsePagination(params?: { page?: string | number; limit?: string | number; category?: string; search?: string }, defaultLimit = 10) {
    const page = Math.max(1, parseInt(String(params?.page || "1"), 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(String(params?.limit || defaultLimit), 10) || defaultLimit));
    const skip = (page - 1) * limit;
    const category = params?.category && params.category !== "All" ? params.category : undefined;
    const search = params?.search ? params.search.trim() : undefined;
    return { page, limit, skip, category, search };
  }

  private buildMeta(total: number, page: number, limit: number) {
    const totalPages = Math.ceil(total / limit) || 1;
    return {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  async listPublic(resource: string, params?: { page?: string | number; limit?: string | number; category?: string; search?: string }) {
    const { page, limit, skip, category, search } = this.parsePagination(params);
    const contentType = contentResourceTypes[resource];

    if (contentType) {
      const where: Prisma.ContentItemWhereInput = {
        type: contentType,
        status: "PUBLISHED",
        ...(category ? { category } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { body: { contains: search, mode: "insensitive" } },
                { excerpt: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      };

      const total = await this.prisma.contentItem.count({ where });
      const data = await this.prisma.contentItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: "desc" },
      });

      return { data, meta: this.buildMeta(total, page, limit) };
    }

    if (resource === "departments") {
      const where: Prisma.DepartmentWhereInput = {
        published: true,
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      };
      const total = await this.prisma.department.count({ where });
      const data = await this.prisma.department.findMany({ where, skip, take: limit, orderBy: { name: "asc" } });
      return { data, meta: this.buildMeta(total, page, limit) };
    }

    if (resource === "leaders") {
      const where: Prisma.LeaderWhereInput = {
        published: true,
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { position: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      };
      const total = await this.prisma.leader.count({ where });
      const data = await this.prisma.leader.findMany({ where, skip, take: limit, orderBy: { sortOrder: "asc" } });
      return { data, meta: this.buildMeta(total, page, limit) };
    }

    if (resource === "gallery") {
      const where: Prisma.GalleryImageWhereInput = {
        published: true,
        ...(category ? { category } : {}),
        ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
      };
      const total = await this.prisma.galleryImage.count({ where });
      const data = await this.prisma.galleryImage.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } });
      return { data, meta: this.buildMeta(total, page, limit) };
    }

    if (resource === "downloads") {
      const where: Prisma.DownloadWhereInput = {
        published: true,
        ...(category ? { category } : {}),
        ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
      };
      const total = await this.prisma.download.count({ where });
      const data = await this.prisma.download.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } });
      return { data, meta: this.buildMeta(total, page, limit) };
    }

    throw new BadRequestException("Unsupported resource");
  }

  async getPublic(resource: string, idOrSlug: string) {
    const contentType = contentResourceTypes[resource];
    if (contentType) {
      return this.findContent(contentType, idOrSlug, true);
    }
    return this.findStandalone(resource, idOrSlug, true);
  }

  async listAdmin(resource: string, params?: { page?: string | number; limit?: string | number; search?: string }) {
    const { page, limit, skip, search } = this.parsePagination(params);
    const contentType = contentResourceTypes[resource];

    if (contentType) {
      const where: Prisma.ContentItemWhereInput = {
        type: contentType,
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { body: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      };
      const total = await this.prisma.contentItem.count({ where });
      const data = await this.prisma.contentItem.findMany({ where, skip, take: limit, orderBy: { updatedAt: "desc" } });
      return { data, meta: this.buildMeta(total, page, limit) };
    }

    if (isStandaloneResource(resource)) {
      return this.listStandaloneAdmin(resource, page, limit, skip, search);
    }
    throw new BadRequestException("Unsupported resource");
  }

  async create(resource: string, dto: UpsertResourceDto) {
    const contentType = contentResourceTypes[resource];
    if (contentType) {
      const translationsPayload = (dto.translations as Prisma.InputJsonValue) ?? { am: {}, om: {} };

      return this.prisma.contentItem.create({
        data: {
          type: contentType,
          title: dto.title ?? "Untitled",
          slug: dto.slug ?? this.slugify(dto.title ?? "untitled"),
          excerpt: dto.excerpt,
          body: dto.body,
          category: dto.category,
          status: dto.status ?? "DRAFT",
          location: dto.location,
          imageUrl: dto.imageUrl,
          publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : undefined,
          metadata: dto.metadata as Prisma.InputJsonValue | undefined,
          translations: translationsPayload,
        },
      });
    }
    return this.createStandalone(resource, dto);
  }

  async update(resource: string, id: string, dto: UpsertResourceDto) {
    const contentType = contentResourceTypes[resource];
    if (contentType) {
      await this.findContent(contentType, id, false);

      const translationsPayload = (dto.translations as Prisma.InputJsonValue) ?? undefined;

      return this.prisma.contentItem.update({
        where: { id },
        data: {
          title: dto.title,
          slug: dto.slug,
          excerpt: dto.excerpt,
          body: dto.body,
          category: dto.category,
          status: dto.status,
          location: dto.location,
          imageUrl: dto.imageUrl,
          publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : undefined,
          metadata: dto.metadata as Prisma.InputJsonValue | undefined,
          ...(translationsPayload !== undefined ? { translations: translationsPayload } : {}),
        },
      });
    }
    return this.updateStandalone(resource, id, dto);
  }

  async remove(resource: string, id: string) {
    const contentType = contentResourceTypes[resource];
    if (contentType) {
      await this.findContent(contentType, id, false);
      return this.prisma.contentItem.delete({ where: { id } });
    }
    if (resource === "departments") return this.prisma.department.delete({ where: { id } });
    if (resource === "leaders") return this.prisma.leader.delete({ where: { id } });
    if (resource === "gallery") return this.prisma.galleryImage.delete({ where: { id } });
    if (resource === "downloads") return this.prisma.download.delete({ where: { id } });
    if (resource === "messages") return this.prisma.message.delete({ where: { id } });
    throw new BadRequestException("Unsupported resource");
  }

  async recordUpload(file: Express.Multer.File) {
    const hasImageKit = 
      process.env.IMAGEKIT_PUBLIC_KEY && 
      process.env.IMAGEKIT_PRIVATE_KEY && 
      process.env.IMAGEKIT_URL_ENDPOINT;

    if (hasImageKit) {
      try {
        const ImageKit = require("imagekit");
        const imagekit = new ImageKit({
          publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
          privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
          urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        });

        // Upload memory buffer to ImageKit
        const uploadResult = await imagekit.upload({
          file: file.buffer,
          fileName: `${Date.now()}-${file.originalname}`,
          folder: "/limu-kosa",
        });

        return this.prisma.upload.create({
          data: {
            fileName: uploadResult.name,
            mimeType: file.mimetype,
            size: uploadResult.size,
            url: uploadResult.url, // Full ImageKit CDN URL
          },
        });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        throw new BadRequestException(`ImageKit upload failed: ${message}`);
      }
    } else {
      // Local fallback pathway
      try {
        const fs = require("fs");
        const path = require("path");
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const cleanedName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
        const fileName = `${unique}-${cleanedName}`;
        
        const uploadDir = process.env.UPLOAD_DIR ?? "uploads";
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        fs.writeFileSync(path.join(uploadDir, fileName), file.buffer);

        return this.prisma.upload.create({
          data: {
            fileName,
            mimeType: file.mimetype,
            size: file.size,
            url: `/uploads/${fileName}`,
          },
        });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        throw new BadRequestException(`Local file write failed: ${message}`);
      }
    }
  }

  private async findContent(type: ContentType, idOrSlug: string, publicOnly: boolean) {
    const item = await this.prisma.contentItem.findFirst({
      where: {
        type,
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        ...(publicOnly ? { status: "PUBLISHED" } : {}),
      },
    });
    if (!item) throw new NotFoundException("Resource item not found");
    return item;
  }

  private async findStandalone(resource: string, idOrSlug: string, publicOnly: boolean) {
    const published = publicOnly ? { published: true } : {};
    if (resource === "departments") return this.prisma.department.findFirstOrThrow({ where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }], ...published } });
    if (resource === "leaders") return this.prisma.leader.findFirstOrThrow({ where: { id: idOrSlug, ...published } });
    if (resource === "gallery") return this.prisma.galleryImage.findFirstOrThrow({ where: { id: idOrSlug, ...published } });
    if (resource === "downloads") return this.prisma.download.findFirstOrThrow({ where: { id: idOrSlug, ...published } });
    if (resource === "messages") return this.prisma.message.findFirstOrThrow({ where: { id: idOrSlug } });
    throw new BadRequestException("Unsupported resource");
  }

  private async listStandaloneAdmin(resource: string, page: number, limit: number, skip: number, search?: string) {
    if (resource === "departments") {
      const where: Prisma.DepartmentWhereInput = search
        ? { OR: [{ name: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }] }
        : {};
      const total = await this.prisma.department.count({ where });
      const data = await this.prisma.department.findMany({ where, skip, take: limit, orderBy: { name: "asc" } });
      return { data, meta: this.buildMeta(total, page, limit) };
    }

    if (resource === "leaders") {
      const where: Prisma.LeaderWhereInput = search
        ? { OR: [{ name: { contains: search, mode: "insensitive" } }, { position: { contains: search, mode: "insensitive" } }] }
        : {};
      const total = await this.prisma.leader.count({ where });
      const data = await this.prisma.leader.findMany({ where, skip, take: limit, orderBy: { sortOrder: "asc" } });
      return { data, meta: this.buildMeta(total, page, limit) };
    }

    if (resource === "gallery") {
      const where: Prisma.GalleryImageWhereInput = search ? { title: { contains: search, mode: "insensitive" } } : {};
      const total = await this.prisma.galleryImage.count({ where });
      const data = await this.prisma.galleryImage.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } });
      return { data, meta: this.buildMeta(total, page, limit) };
    }

    if (resource === "downloads") {
      const where: Prisma.DownloadWhereInput = search ? { title: { contains: search, mode: "insensitive" } } : {};
      const total = await this.prisma.download.count({ where });
      const data = await this.prisma.download.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } });
      return { data, meta: this.buildMeta(total, page, limit) };
    }

    if (resource === "messages") {
      const where: Prisma.MessageWhereInput = search
        ? { OR: [{ name: { contains: search, mode: "insensitive" } }, { subject: { contains: search, mode: "insensitive" } }] }
        : {};
      const total = await this.prisma.message.count({ where });
      const data = await this.prisma.message.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } });
      return { data, meta: this.buildMeta(total, page, limit) };
    }

    throw new BadRequestException("Unsupported resource");
  }

  private async createStandalone(resource: string, dto: UpsertResourceDto) {
    const translationsPayload = (dto.translations as Prisma.InputJsonValue) ?? { am: {}, om: {} };

    if (resource === "departments") {
      return this.prisma.department.create({
        data: {
          name: dto.name ?? dto.title ?? "Untitled department",
          slug: dto.slug ?? this.slugify(dto.name ?? dto.title ?? "department"),
          shortName: dto.shortName,
          description: dto.description ?? dto.body ?? "",
          responsibilities: dto.responsibilities ?? [],
          programs: dto.programs ?? [],
          contact: dto.contact,
          imageUrl: dto.imageUrl,
          published: dto.published ?? true,
          translations: translationsPayload,
        },
      });
    }
    if (resource === "leaders") {
      return this.prisma.leader.create({
        data: {
          name: dto.name ?? "Unnamed leader",
          position: dto.position ?? "Official",
          biography: dto.biography ?? dto.body,
          responsibilities: dto.responsibilities ?? [],
          contact: dto.contact,
          photoUrl: dto.photoUrl ?? dto.imageUrl,
          published: dto.published ?? true,
          translations: translationsPayload,
        },
      });
    }
    if (resource === "gallery") {
      return this.prisma.galleryImage.create({
        data: {
          title: dto.title ?? "Gallery image",
          category: dto.category ?? "General",
          imageUrl: dto.imageUrl ?? "",
          altText: dto.altText,
          published: dto.published ?? true,
          translations: translationsPayload,
        },
      });
    }
    if (resource === "downloads") {
      return this.prisma.download.create({
        data: {
          title: dto.title ?? "Document",
          category: dto.category ?? "General",
          fileUrl: dto.fileUrl ?? "",
          description: dto.description ?? dto.body,
          published: dto.published ?? true,
          translations: translationsPayload,
        },
      });
    }
    if (resource === "messages") {
      return this.prisma.message.create({
        data: {
          name: dto.name ?? "Anonymous",
          email: dto.email ?? "",
          subject: dto.subject ?? "No Subject",
          body: dto.body ?? "",
        },
      });
    }
    throw new BadRequestException("Unsupported resource");
  }

  private async updateStandalone(resource: string, id: string, dto: UpsertResourceDto) {
    const translationsPayload = (dto.translations as Prisma.InputJsonValue) ?? undefined;

    if (resource === "departments") {
      const dataToUpdate: any = { ...(dto as object) };
      if (translationsPayload !== undefined) dataToUpdate.translations = translationsPayload;
      return this.prisma.department.update({ where: { id }, data: dataToUpdate as never });
    }
    if (resource === "leaders") {
      const dataToUpdate: any = { ...(dto as object) };
      if (translationsPayload !== undefined) dataToUpdate.translations = translationsPayload;
      return this.prisma.leader.update({ where: { id }, data: dataToUpdate as never });
    }
    if (resource === "gallery") {
      const dataToUpdate: any = { ...(dto as object) };
      if (translationsPayload !== undefined) dataToUpdate.translations = translationsPayload;
      return this.prisma.galleryImage.update({ where: { id }, data: dataToUpdate as never });
    }
    if (resource === "downloads") {
      const dataToUpdate: any = { ...(dto as object) };
      if (translationsPayload !== undefined) dataToUpdate.translations = translationsPayload;
      return this.prisma.download.update({ where: { id }, data: dataToUpdate as never });
    }
    if (resource === "messages") {
      return this.prisma.message.update({
        where: { id },
        data: {
          name: dto.name,
          email: dto.email,
          subject: dto.subject,
          body: dto.body,
        },
      });
    }
    throw new BadRequestException("Unsupported resource");
  }

  private slugify(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
}
