import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';

import { Timer } from '@app/common/functions/timer';
import { AppModule } from '@app/src/app.module';
import {
  GlobalConfig,
  GlobalConfigType,
  corsConfig,
  createOpenApiDocument,
  swaggerCustomOptions,
  validationPipeConfig,
} from '@app/src/configs';

async function bootstrap() {
  const timer = new Timer().start();
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config: GlobalConfigType = app.get(GlobalConfig);

  app.set('trust proxy', true);
  app.setGlobalPrefix(config.apiPrefix);
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
  app.use(json({ limit: '10mb' }));
  app.use(cookieParser());
  app.enableCors(corsConfig);

  SwaggerModule.setup(config.apiPrefix + config.swaggerUiPath, app, createOpenApiDocument(app), swaggerCustomOptions);

  app.listen(config.serverPort, () => {
    const runTime = timer.end().formattedResult();
    const firstPartOfMessage = `🚀 Application launched in ${runTime} on`;

    logger.log(`${firstPartOfMessage} local: http://localhost:${config.serverPort}${config.apiPrefix}`);
    if (!config.isDevelopmentEnvironment) {
      logger.log(`${firstPartOfMessage} global: https://${config.domain}${config.apiPrefix}`);
    }
  });
}

bootstrap();
