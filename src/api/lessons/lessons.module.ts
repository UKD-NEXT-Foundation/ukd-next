import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { LessonEntity } from './entities/lesson.entity';
import { DatabaseModule } from '@app/src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
