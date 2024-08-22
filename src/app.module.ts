import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { ApiModule } from '@app/api/api.module';
import { config } from '@app/src/configs';

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
