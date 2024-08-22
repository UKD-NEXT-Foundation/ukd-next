import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { Timer } from '@app/common/functions/timer';
import { IExpressRequest } from '@app/common/interfaces';
import { GlobalConfig, GlobalConfigType } from '@app/src/configs';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HttpLoggerMiddleware');

  constructor(
    @Inject(GlobalConfig)
    private readonly config: GlobalConfigType,
  ) {}

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
      const fullError = response['fullError'] ?? null;

      const logMessage = JSON.stringify({
        statusCode,
        method,
        originalUrl,
        userInfo,
        body,
        fullError,
        processingTime: timer.end().formattedResult(),
      });

      if (this.config.isDevelopmentEnvironment) {
        if (statusCode >= 500) {
          this.logger.error(logMessage + fullError);
        } else if (statusCode >= 400) {
          this.logger.warn(logMessage);
        } else {
          this.logger.log(logMessage);
        }
      }
    });

    next();
  }
}
