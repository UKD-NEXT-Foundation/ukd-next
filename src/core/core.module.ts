import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthSessionsModule } from './auth-sessions/auth-sessions.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from '@src/auth/auth.middleware';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule, AuthSessionsModule],
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
