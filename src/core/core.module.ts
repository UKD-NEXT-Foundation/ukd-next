import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthSessionsModule } from './auth-sessions/auth-sessions.module';
import { UsersModule } from './users/users.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { DepartmentsModule } from './departments/departments.module';
import { GroupsModule } from './groups/groups.module';
import { LessonsModule } from './lessons/lessons.module';
import { NewsModule } from './news/news.module';
import { SchedulesModule } from './schedules/schedules.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware, HttpLoggerMiddleware } from '@app/common/middlewares';
import { JournalsModule } from './journals/journals.module';

@Module({
  imports: [
    AuthModule,
    AuthSessionsModule,
    ClassroomsModule,
    DepartmentsModule,
    GroupsModule,
    LessonsModule,
    NewsModule,
    SchedulesModule,
    UsersModule,
    JournalsModule,
  ],
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
