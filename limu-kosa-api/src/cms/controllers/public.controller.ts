import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CmsService } from "../cms.service";
import { UpsertResourceDto } from "../dto";

@ApiTags("Public API")
@Controller("public")
export class PublicController {
  constructor(private readonly cms: CmsService) {}

  @ApiOperation({ summary: "Fetch public list of resources (news, announcements, departments, etc.)" })
  @Get(":resource")
  list(@Param("resource") resource: string) {
    return this.cms.listPublic(resource);
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
