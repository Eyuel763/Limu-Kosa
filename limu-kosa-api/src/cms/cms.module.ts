import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AdminController } from "./controllers/admin.controller";
import { PublicController } from "./controllers/public.controller";
import { CmsService } from "./cms.service";

@Module({
  controllers: [PublicController, AdminController],
  providers: [CmsService, PrismaService],
})
export class CmsModule {}
