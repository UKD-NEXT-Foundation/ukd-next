import { Module } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { JournalsController } from './journals.controller';
import { JournalEntity } from './entities/journal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntity])],
  controllers: [JournalsController],
  providers: [JournalsService],
})
export class JournalsModule {}
