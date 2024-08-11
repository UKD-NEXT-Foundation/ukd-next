import { Module } from '@nestjs/common';
import { AuthSessionsService } from './auth-sessions.service';
import { AuthSessionsController } from './auth-sessions.controller';
import { DatabaseModule } from '@app/src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthSessionsController],
  providers: [AuthSessionsService],
  exports: [AuthSessionsService],
})
export class AuthSessionsModule {}
