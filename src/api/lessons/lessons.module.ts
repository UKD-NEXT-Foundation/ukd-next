// import { TypeOrmModule } from '@nestjs/typeorm';
// import { LessonEntity } from './entities/lesson.entity';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/src/database/database.module';

import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
