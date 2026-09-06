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
import { ApiBearerAuth, ApiOperation, ApiTags, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname } from "path";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CmsService } from "../cms.service";
import { UpsertResourceDto } from "../dto";

@ApiTags("Admin CMS")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("admin")
export class AdminController {
  constructor(private readonly cms: CmsService) {}

  @ApiOperation({ summary: "List all entries for a resource" })
  @Get(":resource")
  list(@Param("resource") resource: string) {
    return this.cms.listAdmin(resource);
  }

  @ApiOperation({ summary: "Create a new resource entry" })
  @Post(":resource")
  create(@Param("resource") resource: string, @Body() dto: UpsertResourceDto) {
    return this.cms.create(resource, dto);
  }

  @ApiOperation({ summary: "Update an existing resource entry" })
  @Patch(":resource/:id")
  update(@Param("resource") resource: string, @Param("id") id: string, @Body() dto: UpsertResourceDto) {
    return this.cms.update(resource, id, dto);
  }

  @ApiOperation({ summary: "Delete a resource entry" })
  @Delete(":resource/:id")
  remove(@Param("resource") resource: string, @Param("id") id: string) {
    return this.cms.remove(resource, id);
  }

  @ApiOperation({ summary: "Upload media file or asset" })
  @Post("uploads/file")
  @UseInterceptors(FileInterceptor("file"))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.cms.recordUpload(file);
  }

}
