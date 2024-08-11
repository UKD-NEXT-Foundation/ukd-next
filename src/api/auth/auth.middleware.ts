import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '@app/api/users/users.service';
import { IExpressRequest } from '@app/common/interfaces';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async use(req: IExpressRequest, _res: Response, next: NextFunction) {
    req.user = null;
    req.sessionId = null;

    if (!req.headers.authorization) {
      return next();
    }

    try {
      const accessToken = req.headers.authorization.split(' ').pop();
      const jwtPayload = await this.authService.verifyAccessToken(accessToken);
      const user = await this.usersService.findOne({ id: jwtPayload.userId as unknown as string });

      req.user = user;
      req.sessionId = jwtPayload.sessionId;
    } catch (_error) {}

    next();
  }
}
