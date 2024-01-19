import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigTypes } from '@src/configurations';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject(ConfigService) private readonly configService: ConfigService<ConfigTypes>) {
    super({
      scope: ['email', 'profile'],
      clientID: configService.getOrThrow('googleClientId'),
      clientSecret: configService.getOrThrow('googleClientSecret'),
      callbackURL: `${
        configService.get('isDevelopmentEnvironment')
          ? 'http://localhost:' + configService.get('serverPort')
          : 'https://' + configService.get('domain')
      }${configService.get('apiPrefix')}/auth/by/google/callback`,
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
