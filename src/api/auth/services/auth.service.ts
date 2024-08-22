import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { google } from 'googleapis';

import { UsersService } from '@app/api/users/users.service';
import { AuthProvider } from '@app/common/enums';
import { GlobalConfig, GlobalConfigType } from '@app/src/configs';

import { IGoogleProfile } from '../interfaces/google-profile.interface';
import { AuthSessionsService } from './auth-sessions.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(GlobalConfig)
    private readonly config: GlobalConfigType,
    private readonly authSessionsService: AuthSessionsService,
    private readonly usersService: UsersService,
  ) {}

  async verifyGoogleToken(accessToken: string): Promise<IGoogleProfile> {
    const oauthClient = new google.auth.OAuth2(this.config.googleClientId, this.config.googleClientSecret);
    const userInfoClient = google.oauth2('v2').userinfo;

    oauthClient.setCredentials({ access_token: accessToken });

    const { data: profile } = await userInfoClient.get({ auth: oauthClient });

    return profile;
  }

  async signInByGoogleToken(profile: IGoogleProfile, userAgent: string, ipAddress: string) {
    if (this.config.authOnlyFromDomain && this.config.authOnlyFromDomain !== profile.email.split('@').pop()) {
      throw new ConflictException('An account with such a domain is not allowed');
    }

    const user = await this.usersService.findOne({ email: profile.email });

    if (user) {
      await this.usersService.update({
        id: user.id,
        languageCode: profile.language,
        pictureURL: profile.picture,
        googleUserId: profile.id,
      });

      return this.authSessionsService.create(user, userAgent, ipAddress);
    }

    const newUser = await this.usersService.create({
      fullname: `${profile.given_name} ${profile.family_name}`,
      authProvider: AuthProvider.Google,
      languageCode: profile.language,
      pictureURL: profile.picture,
      googleUserId: profile.id,
      email: profile.email,
    });

    return this.authSessionsService.create(newUser, userAgent, ipAddress);
  }

  refresh(refreshToken: string) {
    return this.authSessionsService.update(refreshToken);
  }

  logout(refreshToken: string) {
    return this.authSessionsService.remove(refreshToken);
  }
}
