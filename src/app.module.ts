import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@src/users/users.module';
import { AuthSessionsModule } from '@src/auth-sessions/auth-sessions.module';
import { ConfigModule } from '@nestjs/config';
import { config, GlobalConfig, typeormConfig } from '@src/configurations';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [GlobalConfig],
      useFactory: typeormConfig,
    }),
    AuthModule,
    UsersModule,
    AuthSessionsModule,
  ],
})
export class AppModule {}
