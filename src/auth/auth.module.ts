import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/core/users/users.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      // global: true,
      secret: 'secret',
      // signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
