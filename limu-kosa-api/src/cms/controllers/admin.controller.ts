import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiOperation, ApiTags, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CmsService } from "../cms.service";
import { UpsertResourceDto } from "../dto";

@ApiTags("Admin CMS")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("admin")
export class AdminController {
  constructor(private readonly cms: CmsService) {}

  @ApiOperation({ summary: "List all entries for a resource with pagination" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  @Get(":resource")
  list(
    @Param("resource") resource: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("search") search?: string,
  ) {
    return this.cms.listAdmin(resource, { page, limit, search });
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
