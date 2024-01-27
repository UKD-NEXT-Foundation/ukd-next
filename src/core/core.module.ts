import { ArgumentsHost, Catch, ExceptionFilter, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthSessionsModule } from './auth-sessions/auth-sessions.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from '@src/auth/auth.middleware';
import { AuthModule } from '@src/auth/auth.module';
import { TypeORMError } from 'typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { DepartmentsModule } from './departments/departments.module';
import { GroupsModule } from './groups/groups.module';
import { LessonsModule } from './lessons/lessons.module';
import { NewsModule } from './news/news.module';
import { SchedulesModule } from './schedules/schedules.module';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const customResponse = {
      status: 500,
      message: exception.message,
      timestamp: new Date().toISOString(),
    };
    response.status(customResponse.status).json(customResponse);
  }
}

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AuthSessionsModule,
    GroupsModule,
    DepartmentsModule,
    ClassroomsModule,
    LessonsModule,
    SchedulesModule,
    NewsModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: TypeOrmFilter }],
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
