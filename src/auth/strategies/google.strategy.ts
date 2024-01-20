import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { GlobalConfig, GlobalConfigType } from '@src/configurations';
import { IGoogleProfile } from '../interfaces/google-profile.interface';
import { AuthProvider } from '@src/users/enums/auth-provider.enum';

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

  async validate(_accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const user: IGoogleProfile = {
      provider: AuthProvider.Google,
      providerId: profile.id,
      email: profile.emails[0].value,
      name: `${profile.name.givenName} ${profile.name.familyName}`,
      picture: profile.photos[0].value,
    };

    done(null, user);
  }
}
