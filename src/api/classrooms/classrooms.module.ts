import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/src/database/database.module';

import { ClassroomsController } from './classrooms.controller';
import { ClassroomsService } from './classrooms.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
})
export class ClassroomsModule {}
