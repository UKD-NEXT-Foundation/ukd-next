import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '@core/users/users.module';
import { AuthSessionsModule } from '@core/auth-sessions/auth-sessions.module';

@Module({
  imports: [PassportModule, JwtModule, AuthSessionsModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
