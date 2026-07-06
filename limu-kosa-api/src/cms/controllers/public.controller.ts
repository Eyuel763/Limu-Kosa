import { Controller, Get, Param } from "@nestjs/common";
import { CmsService } from "../cms.service";

@Controller("public")
export class PublicController {
  constructor(private readonly cms: CmsService) {}

  @Get(":resource")
  list(@Param("resource") resource: string) {
    return this.cms.listPublic(resource);
  }

  @Get(":resource/:idOrSlug")
  get(@Param("resource") resource: string, @Param("idOrSlug") idOrSlug: string) {
    return this.cms.getPublic(resource, idOrSlug);
  }
}
