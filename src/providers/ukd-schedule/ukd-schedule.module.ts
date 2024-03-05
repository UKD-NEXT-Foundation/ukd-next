import { Module } from '@nestjs/common';
import { UkdScheduleService } from './ukd-schedule.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ baseURL: 'https://api.dmytroframe.com/ukd' })],
  providers: [UkdScheduleService],
})
export class UkdScheduleModule {}
