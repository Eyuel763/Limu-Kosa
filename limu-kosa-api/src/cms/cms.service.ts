import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ContentType, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { UpsertResourceDto } from "./dto";
import { contentResourceTypes, isStandaloneResource } from "./resource-map";

@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) {}

  async listPublic(resource: string) {
    const contentType = contentResourceTypes[resource];
    if (contentType) {
      return this.prisma.contentItem.findMany({
        where: { type: contentType, status: "PUBLISHED" },
        orderBy: { updatedAt: "desc" },
      });
    }

    if (resource === "departments") return this.prisma.department.findMany({ where: { published: true }, orderBy: { name: "asc" } });
    if (resource === "leaders") return this.prisma.leader.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
    if (resource === "gallery") return this.prisma.galleryImage.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
    if (resource === "downloads") return this.prisma.download.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });

    throw new BadRequestException("Unsupported resource");
  }

  async getPublic(resource: string, idOrSlug: string) {
    const contentType = contentResourceTypes[resource];
    if (contentType) {
      return this.findContent(contentType, idOrSlug, true);
    }
    return this.findStandalone(resource, idOrSlug, true);
  }

  async listAdmin(resource: string) {
    const contentType = contentResourceTypes[resource];
    if (contentType) {
      return this.prisma.contentItem.findMany({ where: { type: contentType }, orderBy: { updatedAt: "desc" } });
    }
    if (isStandaloneResource(resource)) {
      return this.listStandalone(resource);
    }
    throw new BadRequestException("Unsupported resource");
  }

  async create(resource: string, dto: UpsertResourceDto) {
    const contentType = contentResourceTypes[resource];
    if (contentType) {
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
        },
      });
    }
    return this.createStandalone(resource, dto);
  }

  async update(resource: string, id: string, dto: UpsertResourceDto) {
    const contentType = contentResourceTypes[resource];
    if (contentType) {
      await this.findContent(contentType, id, false);
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
    throw new BadRequestException("Unsupported resource");
  }

  private listStandalone(resource: string) {
    if (resource === "departments") return this.prisma.department.findMany({ orderBy: { name: "asc" } });
    if (resource === "leaders") return this.prisma.leader.findMany({ orderBy: { sortOrder: "asc" } });
    if (resource === "gallery") return this.prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
    if (resource === "downloads") return this.prisma.download.findMany({ orderBy: { createdAt: "desc" } });
    throw new BadRequestException("Unsupported resource");
  }

  private createStandalone(resource: string, dto: UpsertResourceDto) {
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
        },
      });
    }
    throw new BadRequestException("Unsupported resource");
  }

  private updateStandalone(resource: string, id: string, dto: UpsertResourceDto) {
    if (resource === "departments") return this.prisma.department.update({ where: { id }, data: dto as never });
    if (resource === "leaders") return this.prisma.leader.update({ where: { id }, data: dto as never });
    if (resource === "gallery") return this.prisma.galleryImage.update({ where: { id }, data: dto as never });
    if (resource === "downloads") return this.prisma.download.update({ where: { id }, data: dto as never });
    throw new BadRequestException("Unsupported resource");
  }

  private slugify(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
}
