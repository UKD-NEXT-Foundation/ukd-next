import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/src/database/database.module';

import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
