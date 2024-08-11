import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from '@app/src/configs';
import { ApiModule } from '@app/api/api.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    ScheduleModule.forRoot(),
    ApiModule,
  ],
})
export class AppModule {}
