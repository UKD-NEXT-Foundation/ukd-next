import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '@app/core/users/users.service';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      return next();
    }

    try {
      const accessToken = req.headers.authorization.split(' ').pop();
      const jwtPayload = await this.authService.verifyAccessToken(accessToken);
      const user = await this.usersService.findOne(jwtPayload.userId);

      req.user = user;
    } catch (err) {
      req.user = null;
    }

    next();
  }
}
