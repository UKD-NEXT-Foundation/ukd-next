import { Module } from '@nestjs/common';
import { AuthSessionsModule } from './auth-sessions/auth-sessions.module';
import { UsersModule } from './users/users.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { DepartmentsModule } from './departments/departments.module';
import { GroupsModule } from './groups/groups.module';
import { LessonsModule } from './lessons/lessons.module';
import { NewsModule } from './news/news.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    UsersModule,
    AuthSessionsModule,
    GroupsModule,
    DepartmentsModule,
    ClassroomsModule,
    LessonsModule,
    SchedulesModule,
    NewsModule,
  ],
})
export class CoreModule {}
