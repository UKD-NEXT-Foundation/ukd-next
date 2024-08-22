import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GlobalConfig, GlobalConfigType } from '@app/src/configs';

import { IJwtPayloadResponse } from '../interfaces/jwt-payload-response.interface';

@Injectable()
export class AuthJWTService {
  constructor(
    @Inject(GlobalConfig)
    private readonly config: GlobalConfigType,
    private readonly jwtService: JwtService,
  ) {}

  async verifyAccessToken(accessToken: string): Promise<IJwtPayloadResponse> {
    try {
      const results = await this.jwtService.verifyAsync(accessToken, { secret: this.config.jwtAccessTokenSecret });
      return results;
    } catch (_error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async verifyRefreshToken(refreshToken: string): Promise<IJwtPayloadResponse> {
    try {
      const results = await this.jwtService.verifyAsync(refreshToken, { secret: this.config.jwtRefreshTokenSecret });
      return results;
    } catch (_error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  generateAccessToken(payload: object): Promise<string> {
    delete payload['iat'];
    delete payload['exp'];

    return this.jwtService.signAsync(payload, {
      expiresIn: this.config.jwtAccessTokenExpiresIn,
      secret: this.config.jwtAccessTokenSecret,
      algorithm: 'HS256',
    });
  }

  generateRefreshToken(payload: object): Promise<string> {
    delete payload['iat'];
    delete payload['exp'];

    return this.jwtService.signAsync(payload, {
      expiresIn: this.config.jwtRefreshTokenExpiresIn,
      secret: this.config.jwtRefreshTokenSecret,
      algorithm: 'HS512',
    });
  }
}
