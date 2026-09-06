import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
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

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Limu Kosa Woreda API")
    .setDescription("Interactive OpenAPI / Swagger documentation for Limu Kosa Woreda Administration API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);

  await app.listen(config.get<number>("PORT") ?? 4000);
}

bootstrap();
