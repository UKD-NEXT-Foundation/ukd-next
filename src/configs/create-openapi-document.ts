import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function createOpenApiDocument(app: INestApplication) {
  const document = new DocumentBuilder()
    .setTitle('UKD NEXT API')
    .setDescription('The UKD NEXT API description')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  return SwaggerModule.createDocument(app, document);
}
