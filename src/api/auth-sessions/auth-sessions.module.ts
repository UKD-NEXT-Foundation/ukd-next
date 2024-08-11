import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/src/database/database.module';

import { AuthSessionsController } from './auth-sessions.controller';
import { AuthSessionsService } from './auth-sessions.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthSessionsController],
  providers: [AuthSessionsService],
  exports: [AuthSessionsService],
})
export class AuthSessionsModule {}
