import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '@app/common/decorators';
import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { AuthSessionsService } from './auth-sessions.service';
import { CreateAuthSessionDto } from './dto/create-auth-session.dto';
import { UpdateAuthSessionDto } from './dto/update-auth-session.dto';

@ApiBearerAuth()
@ApiTags('Auth Sessions')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.Moderator)
@Controller('auth-sessions')
export class AuthSessionsController {
  constructor(private readonly authSessionsService: AuthSessionsService) {}

  @Post()
  create(@Body() payload: CreateAuthSessionDto) {
    return this.authSessionsService.create(payload);
  }

  @Get()
  findAll() {
    return this.authSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.authSessionsService.findOne(id);
  }

  @Patch()
  update(@Body() payload: UpdateAuthSessionDto) {
    return this.authSessionsService.update(payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.authSessionsService.remove(id);
  }
}
