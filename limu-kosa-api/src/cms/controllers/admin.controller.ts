import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CmsService } from "../cms.service";
import { UpsertResourceDto } from "../dto";

@UseGuards(JwtAuthGuard)
@Controller("admin")
export class AdminController {
  constructor(private readonly cms: CmsService) {}

  @Get(":resource")
  list(@Param("resource") resource: string) {
    return this.cms.listAdmin(resource);
  }

  @Post(":resource")
  create(@Param("resource") resource: string, @Body() dto: UpsertResourceDto) {
    return this.cms.create(resource, dto);
  }

  @Patch(":resource/:id")
  update(@Param("resource") resource: string, @Param("id") id: string, @Body() dto: UpsertResourceDto) {
    return this.cms.update(resource, id, dto);
  }

  @Delete(":resource/:id")
  remove(@Param("resource") resource: string, @Param("id") id: string) {
    return this.cms.remove(resource, id);
  }

  @Post("uploads/file")
  @UseInterceptors(FileInterceptor("file"))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.cms.recordUpload(file);
  }

}
