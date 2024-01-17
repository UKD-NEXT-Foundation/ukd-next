import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/core/users/users.service';
import { Request } from 'express';

export type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersService: UsersService) {
    const extractJwtFromCookie = (req: Request) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req as any);
    };

    super({
      ignoreExpiration: false,
      secretOrKey: 'jwt.secret',
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOne(Number(payload.sub));

    if (!user) throw new UnauthorizedException('Please log in to continue');

    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
