import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from '@app/src/app.module';
import { Timer } from '@app/common/functions/timer';
import {
  GlobalConfig,
  GlobalConfigType,
  corsConfig,
  createOpenApiDocument,
  swaggerCustomOptions,
} from '@app/src/configs';

async function bootstrap() {
  const timer = new Timer().start();
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  const config: GlobalConfigType = app.get(GlobalConfig);

  app.setGlobalPrefix(config.apiPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
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
