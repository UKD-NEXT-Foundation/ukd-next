import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@src/users/users.module';
import { AuthSessionsModule } from '@src/auth-sessions/auth-sessions.module';
import { ConfigModule } from '@nestjs/config';
import { config, GlobalConfig, typeormConfig } from '@src/configurations';
import { AuthMiddleware } from '@src/auth/auth.middleware';
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
