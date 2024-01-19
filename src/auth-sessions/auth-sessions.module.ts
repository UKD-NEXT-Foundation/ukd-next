import { Module } from '@nestjs/common';
import { AuthSessionsService } from './auth-sessions.service';
import { AuthSessionsController } from './auth-sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSessionEntity } from './entities/auth-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthSessionEntity])],
  controllers: [AuthSessionsController],
  providers: [AuthSessionsService],
  exports: [AuthSessionsService],
})
export class AuthSessionsModule {}
