import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from 'package.json';

export function swaggerConfig(app: INestApplication) {
  const documentConfig = new DocumentBuilder()
    .setTitle('UKD NEXT API')
    .setDescription('The UKD NEXT API description')
    .addBearerAuth()
    .setVersion(version)
    .build();

  return SwaggerModule.createDocument(app, documentConfig);
}
