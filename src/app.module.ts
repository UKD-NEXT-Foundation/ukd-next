import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config, GlobalConfig, typeormConfig } from '@app/src/configs';
import { TypeOrmFilterProvider } from '@app/common/exception-filters';
import { HttpLoggerMiddleware } from '@app/common/middlewares';
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
    CoreModule,
  ],
  providers: [TypeOrmFilterProvider],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
