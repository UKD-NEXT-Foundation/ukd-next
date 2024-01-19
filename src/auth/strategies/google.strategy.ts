import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { globalConfig, ConfigTypes } from '@src/configurations';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject(globalConfig.KEY) private readonly config: ConfigTypes) {
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
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
