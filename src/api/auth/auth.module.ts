import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@app/api/users/users.module';

import { SessionsModule } from '../sessions/sessions.module';
import { AuthController } from './auth.controller';
import { AuthJWTService } from './services/auth-jwt.service';
import { AuthSessionsService } from './services/auth-sessions.service';
import { AuthService } from './services/auth.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [PassportModule, JwtModule, SessionsModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AuthSessionsService, AuthJWTService, GoogleStrategy],
  exports: [AuthService, AuthJWTService],
})
export class AuthModule {}
