import { Module } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { JournalsController } from './journals.controller';
import { LessonsModule } from '../lessons/lessons.module';
import { DatabaseModule } from '@app/src/database/database.module';

@Module({
  imports: [DatabaseModule, LessonsModule],
  controllers: [JournalsController],
  providers: [JournalsService],
})
export class JournalsModule {}
