import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { PrismaExceptionFilter } from '@app/common/filters';
import { AuthMiddleware, HttpLoggerMiddleware } from '@app/common/middlewares';

import { AuthModule } from './auth/auth.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { DepartmentsModule } from './departments/departments.module';
import { GroupsModule } from './groups/groups.module';
import { JournalsModule } from './journals/journals.module';
import { LessonsModule } from './lessons/lessons.module';
import { NewsModule } from './news/news.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SchedulesModule } from './schedules/schedules.module';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';
import { VariablesModule } from './variables/variables.module';

@Module({
  imports: [
    AuthModule,
    ClassroomsModule,
    DepartmentsModule,
    GroupsModule,
    LessonsModule,
    NewsModule,
    SchedulesModule,
    UsersModule,
    JournalsModule,
    VariablesModule,
    NotificationsModule,
    SessionsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
