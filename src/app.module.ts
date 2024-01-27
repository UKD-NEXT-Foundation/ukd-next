import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config, GlobalConfig, typeormConfig } from '@src/configs';
import { CoreModule } from './core/core.module';
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
    CoreModule,
  ],
})
export class AppModule {}
