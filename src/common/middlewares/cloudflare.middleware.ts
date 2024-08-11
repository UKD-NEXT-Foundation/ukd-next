import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CloudflareMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const cloudflareIp = req.headers['cf-connecting-ip'];

    if (cloudflareIp) {
      Object.defineProperty(req, 'ip', { value: cloudflareIp });
    }

    next();
  }
}
