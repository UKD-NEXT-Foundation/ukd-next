import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config, GlobalConfig, typeormConfig } from '@app/src/configs';
import { TypeOrmFilterProvider } from '@app/common/exception-filters';
import { AuthMiddleware, HttpLoggerMiddleware } from '@app/common/middlewares';
import { AuthModule } from '@app/src/auth/auth.module';
import { UsersModule } from '@app/core/users/users.module';
import { CoreModule } from '@app/core/core.module';

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
    CoreModule,
  ],
  providers: [TypeOrmFilterProvider],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
