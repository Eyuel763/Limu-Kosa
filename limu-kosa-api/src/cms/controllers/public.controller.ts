import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CmsService } from "../cms.service";
import { UpsertResourceDto } from "../dto";

@ApiTags("Public API")
@Controller("public")
export class PublicController {
  constructor(private readonly cms: CmsService) {}

  @ApiOperation({ summary: "Fetch public list of resources with pagination" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "category", required: false, type: String })
  @ApiQuery({ name: "search", required: false, type: String })
  @Get(":resource")
  list(
    @Param("resource") resource: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("category") category?: string,
    @Query("search") search?: string,
  ) {
    return this.cms.listPublic(resource, { page, limit, category, search });
  }

  @ApiOperation({ summary: "Fetch a single public resource by ID or slug" })
  @Get(":resource/:idOrSlug")
  get(@Param("resource") resource: string, @Param("idOrSlug") idOrSlug: string) {
    return this.cms.getPublic(resource, idOrSlug);
  }

  @ApiOperation({ summary: "Submit a public contact message" })
  @Post("messages")
  createMessage(@Body() dto: UpsertResourceDto) {
    return this.cms.create("messages", dto);
  }
}
