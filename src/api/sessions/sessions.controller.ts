import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles, User } from '@app/common/decorators';
import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { CreateSessionDto } from './dto/create-session.dto';
import { SessionResponseDto } from './dto/session-response.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionsService } from './sessions.service';

@ApiBearerAuth()
@ApiTags('Sessions')
@UseGuards(AuthGuard, RolesGuard)
@Controller('/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @ApiResponse({ type: SessionResponseDto, status: HttpStatus.CREATED, isArray: true })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post()
  create(@Body() payload: CreateSessionDto) {
    return this.sessionsService.create(payload);
  }

  @ApiResponse({ type: SessionResponseDto, status: HttpStatus.OK, isArray: true })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @ApiResponse({ type: SessionResponseDto, status: HttpStatus.OK, isArray: true })
  @Get('/personal')
  findPersonal(@User('id') userId: string) {
    return this.sessionsService.findAll({ userId });
  }

  @ApiResponse({ type: SessionResponseDto, status: HttpStatus.OK, isArray: true })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get('/by-user/:userId')
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.sessionsService.findAll({ userId });
  }

  @ApiResponse({ type: SessionResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.sessionsService.findOne(id);
  }

  @ApiResponse({ type: SessionResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Patch()
  update(@Body() payload: UpdateSessionDto) {
    return this.sessionsService.update(payload);
  }

  @ApiResponse({ type: SessionResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.sessionsService.remove(id);
  }
}
