import { Module } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { JournalsController } from './journals.controller';
import { JournalEntity } from './entities/journal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntity]), LessonsModule],
  controllers: [JournalsController],
  providers: [JournalsService],
})
export class JournalsModule {}
