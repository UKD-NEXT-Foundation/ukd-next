import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { UsersService } from '@app/api/users/users.service';
import { IExpressRequest } from '@app/common/interfaces';

import { AuthJWTService } from './services/auth-jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly authJWTService: AuthJWTService,
  ) {}

  async use(req: IExpressRequest, _: Response, next: NextFunction) {
    req.user = null;
    req.sessionId = null;

    if (!req.headers.authorization) {
      return next();
    }

    try {
      const accessToken = req.headers.authorization.split(' ').pop();
      const jwtPayload = await this.authJWTService.verifyAccessToken(accessToken);
      const user = await this.usersService.findOne({ id: jwtPayload.userId });

      req.user = user;
      req.sessionId = jwtPayload.sessionId;
    } catch (_) {}

    next();
  }
}
