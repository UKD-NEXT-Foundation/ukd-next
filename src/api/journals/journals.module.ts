import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/src/database/database.module';

import { LessonsModule } from '../lessons/lessons.module';
import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';

@Module({
  imports: [DatabaseModule, LessonsModule],
  controllers: [JournalsController],
  providers: [JournalsService],
})
export class JournalsModule {}
