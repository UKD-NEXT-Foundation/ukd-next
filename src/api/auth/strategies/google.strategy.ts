import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

import { GlobalConfig, GlobalConfigType } from '@app/src/configs';

import { IGoogleProfile } from '../interfaces/google-profile.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject(GlobalConfig) private readonly config: GlobalConfigType) {
    super({
      scope: ['email', 'profile'],
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL:
        (config.isDevelopmentEnvironment ? 'http://localhost:' + config.serverPort : 'https://' + config.domain) +
        config.apiPrefix +
        '/auth/by/google/callback',
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: IGoogleProfile,
    done: VerifyCallback,
  ): Promise<any> {
    done(null, profile);
  }
}
