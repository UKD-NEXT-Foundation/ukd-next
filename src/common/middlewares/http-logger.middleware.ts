import { Response, NextFunction } from 'express';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { IExpressRequest } from '@app/common/interfaces';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HttpLoggerMiddleware');

  use(request: IExpressRequest, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body, user, sessionId } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;

      const logMessage = JSON.stringify({
        method,
        originalUrl,
        statusCode,
        user: user ? { id: user.id, email: user.email, roles: user.roles } : null,
        sessionId,
        body,
        ip,
        userAgent,
      });

      if (statusCode >= 500) {
        this.logger.error(logMessage);
      } else if (statusCode >= 400) {
        this.logger.warn(logMessage);
      } else {
        this.logger.log(logMessage);
      }
    });

    next();
  }
}
