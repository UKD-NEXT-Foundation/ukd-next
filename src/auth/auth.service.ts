import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { google } from 'googleapis';
import ms from 'ms';
import { AuthSessionsService } from '@app/core/auth-sessions/auth-sessions.service';
import { GlobalConfig, GlobalConfigType } from '@app/src/configs';
import { UserEntity } from '@app/core/users/entities/user.entity';
import { UsersService } from '@app/core/users/users.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IJwtPayloadResponse } from './interfaces/jwt-payload-response.interface';
import { IGoogleProfile } from './interfaces/google-profile.interface';
import { AuthProvider } from '@app/common/enums';

@Injectable()
export class AuthService {
  constructor(
    @Inject(GlobalConfig)
    private readonly config: GlobalConfigType,
    private readonly jwtService: JwtService,
    private readonly authSessionsService: AuthSessionsService,
    private readonly usersService: UsersService,
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
    const user = await this.usersService.findOne({ email: profile.email });

    if (user) {
      return this.createSession(user, userAgent);
    }

    const newUser = await this.usersService.create({
      fullname: `${profile.given_name} ${profile.family_name}`,
      authProvider: AuthProvider.Google,
      pictureURL: profile.picture,
      googleUserId: +profile.id,
      email: profile.email,
    });

    return this.createSession(newUser, userAgent);
  }

  private async createSession(user: UserEntity, userAgent: string) {
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
    ]);

    await this.authSessionsService.update(authSession.id, { refreshToken }, false);

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
        this.authSessionsService.update(payload.sessionId, { lastTokenUpdateAt: new Date() }, false),
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

      const { affected } = await this.authSessionsService.remove(payload.sessionId);

      if (affected) {
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
