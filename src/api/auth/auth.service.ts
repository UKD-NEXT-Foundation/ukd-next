import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '@prisma/client';
import { google } from 'googleapis';
import ms from 'ms';

import { AuthSessionsService } from '@app/api/auth-sessions/auth-sessions.service';
import { UsersService } from '@app/api/users/users.service';
import { AuthProvider } from '@app/common/enums';
import { GlobalConfig, GlobalConfigType } from '@app/src/configs';

import { IGoogleProfile } from './interfaces/google-profile.interface';
import { IJwtPayloadResponse } from './interfaces/jwt-payload-response.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(GlobalConfig)
    private readonly config: GlobalConfigType,
    private readonly authSessionsService: AuthSessionsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyAccessToken(accessToken: string) {
    return this.jwtService.verifyAsync<IJwtPayloadResponse>(accessToken, { secret: this.config.jwtAccessTokenSecret });
  }

  async verifyGoogleToken(accessToken: string): Promise<IGoogleProfile> {
    const oauthClient = new google.auth.OAuth2(this.config.googleClientId, this.config.googleClientSecret);
    const userInfoClient = google.oauth2('v2').userinfo;

    oauthClient.setCredentials({ access_token: accessToken });

    const { data: profile } = await userInfoClient.get({ auth: oauthClient });

    return profile;
  }

  async signInByGoogle(profile: IGoogleProfile, userAgent: string) {
    if (this.config.authOnlyFromDomain && this.config.authOnlyFromDomain !== profile.email.split('@').pop()) {
      throw new HttpException('An account with such a domain is not allowed', HttpStatus.CONFLICT);
    }

    const user = await this.usersService.findOne({ email: profile.email });

    if (user) {
      return this.createSession(user, userAgent, profile);
    }

    const newUser = await this.usersService.create({
      fullname: `${profile.given_name} ${profile.family_name}`,
      authProvider: AuthProvider.Google,
      languageCode: profile.language,
      pictureURL: profile.picture,
      googleUserId: profile.id,
      email: profile.email,
    });

    return this.createSession(newUser, userAgent);
  }

  private async createSession(user: UserModel, userAgent: string, profile?: IGoogleProfile) {
    const authSession = await this.authSessionsService.create({
      expiresIn: new Date(Date.now() + ms(this.config.jwtRefreshTokenExpiresIn) * 1000),
      refreshToken: 'The process of creating sessions continues...',
      lastTokenUpdateAt: new Date(),
      userId: user.id,
      userAgent,
    });

    const payload: IJwtPayload = {
      userId: user.id,
      email: user.email,
      sessionId: authSession.id,
    };

    const [refreshToken, accessToken] = await Promise.all([
      this.generateRefreshToken(payload),
      this.generateAccessToken(payload),
      profile
        ? this.usersService.update({
            id: user.id,
            languageCode: profile.language,
            pictureURL: profile.picture,
            googleUserId: profile.id,
          })
        : null,
    ]);

    await this.authSessionsService.update({ id: authSession.id, refreshToken });

    return { refreshToken, accessToken };
  }

  async updateSession(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<IJwtPayloadResponse>(refreshToken, {
        secret: this.config.jwtRefreshTokenSecret,
      });

      delete payload.iat;
      delete payload.exp;

      const [accessToken] = await Promise.all([
        this.generateAccessToken(payload),
        this.authSessionsService.update({ id: payload.sessionId, lastTokenUpdateAt: new Date() }),
      ]);

      return { accessToken };
    } catch (_error) {
      throw new HttpException(
        'Invalid or expired token. Please log in again to obtain a valid token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async removeSession(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<IJwtPayloadResponse>(refreshToken, {
        secret: this.config.jwtRefreshTokenSecret,
        ignoreExpiration: true,
      });

      const deletedSession = await this.authSessionsService.remove(payload.sessionId);

      if (deletedSession) {
        return { statusCode: HttpStatus.OK, message: 'Session successfully deleted' };
      }

      throw new HttpException(
        'Could not find a session using the given refreshToken',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      throw new HttpException('Invalid token. Please log in again to obtain a valid token', HttpStatus.UNAUTHORIZED);
    }
  }

  private generateAccessToken(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.config.jwtAccessTokenExpiresIn,
      secret: this.config.jwtAccessTokenSecret,
      algorithm: 'HS256',
    });
  }

  private generateRefreshToken(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.config.jwtRefreshTokenExpiresIn,
      secret: this.config.jwtRefreshTokenSecret,
      algorithm: 'HS512',
    });
  }
}
