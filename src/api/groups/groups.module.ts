import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/src/database/database.module';

import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
