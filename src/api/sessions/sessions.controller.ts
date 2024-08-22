import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles, User } from '@app/common/decorators';
import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionsService } from './sessions.service';

@ApiBearerAuth()
@ApiTags('Sessions')
@UseGuards(AuthGuard, RolesGuard)
@Controller('/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post()
  create(@Body() payload: CreateSessionDto) {
    return this.sessionsService.create(payload);
  }

  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get('/personal')
  findPersonal(@User('id') userId: string) {
    return this.sessionsService.findAll({ userId });
  }

  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get('/by-user/:userId')
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.sessionsService.findAll({ userId });
  }

  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.sessionsService.findOne(id);
  }

  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Patch()
  update(@Body() payload: UpdateSessionDto) {
    return this.sessionsService.update(payload);
  }

  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.sessionsService.remove(id);
  }
}
