import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/src/database/database.module';

import { SessionsModule } from '../sessions/sessions.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [DatabaseModule, SessionsModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
