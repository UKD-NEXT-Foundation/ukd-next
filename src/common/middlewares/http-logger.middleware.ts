import { Inject, Injectable, Logger, NestMiddleware, OnModuleDestroy } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { graylog as GraylogLogger } from 'graylog2';

import { Timer } from '@app/common/functions/timer';
import { IExpressRequest } from '@app/common/interfaces';
import { GlobalConfig, GlobalConfigType } from '@app/src/configs';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware, OnModuleDestroy {
  private readonly logger: Logger | GraylogLogger;

  constructor(@Inject(GlobalConfig) private readonly config: GlobalConfigType) {
    if (this.config.isDevelopmentEnvironment) {
      this.logger = new Logger('HttpLoggerMiddleware');
    } else {
      this.logger = new GraylogLogger({
        servers: [{ host: config.graylogHost, port: this.config.graylogPort }],
        facility: 'ukd-next--backend',
        hostname: this.config.domain,
      });
    }
  }

  use(request: IExpressRequest, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body, user, sessionId } = request;
    const timer = new Timer().start();

    const userInfo = {
      id: user?.id ?? null,
      email: user?.email ?? null,
      roles: user?.roles ?? null,
      sessionId,
      userAgent: request.get('user-agent') || '',
      ip,
    };

    response.on('finish', () => {
      const { statusCode } = response;
      const error = response['fullError'] ?? null;

      const logMessage = JSON.stringify({
        statusCode,
        method,
        originalUrl,
        userInfo,
        body,
        error,
        time: timer.end().formattedResult(),
      });

      if (statusCode >= 500) {
        if (this.config.isDevelopmentEnvironment) this.logger.error(error);
        this.logger.error(logMessage);
      } else if (statusCode >= 400) {
        this.logger.warn(logMessage);
      } else {
        this.logger.log(logMessage);
      }
    });

    next();
  }

  onModuleDestroy() {
    if (!this.config.isDevelopmentEnvironment) {
      (this.logger as GraylogLogger).close();
    }
  }
}
