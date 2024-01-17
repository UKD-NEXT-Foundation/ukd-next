import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '711823262458-hhbrq9o6f0sophmsv2a521kfqbpikhp4.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8000/api/auth/google/callback',
      scope: ['profile', 'email'],
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
