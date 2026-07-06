import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const origins = config.get<string>("CORS_ORIGIN")?.split(",") ?? ["http://127.0.0.1:3000"];

  app.setGlobalPrefix("api");
  app.enableCors({ origin: origins, credentials: true });
  app.useStaticAssets(join(process.cwd(), config.get<string>("UPLOAD_DIR") ?? "uploads"), {
    prefix: "/uploads",
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(config.get<number>("PORT") ?? 4000);
}

bootstrap();
