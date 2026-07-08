import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const originsRaw = config.get<string>("CORS_ORIGINS") ?? config.get<string>("CORS_ORIGIN") ?? "*";
  const origins: string | string[] = originsRaw === "*" ? "*" : originsRaw.split(",").map((o) => o.trim());


  app.setGlobalPrefix("api");
  app.enableCors({ origin: origins, credentials: true });
  app.useStaticAssets(join(process.cwd(), config.get<string>("UPLOAD_DIR") ?? "uploads"), {
    prefix: "/uploads",
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(config.get<number>("PORT") ?? 4000);
}

bootstrap();
