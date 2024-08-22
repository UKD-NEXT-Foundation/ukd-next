import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { Roles } from '../auth/decorators';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@ApiTags('Classrooms')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
@Controller('/classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Post()
  create(@Body() payload: CreateClassroomDto) {
    return this.classroomsService.create(payload);
  }

  @Get()
  findAll() {
    return this.classroomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.classroomsService.findOne(id);
  }

  @Patch()
  update(@Body() payload: UpdateClassroomDto) {
    return this.classroomsService.update(payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.classroomsService.remove(id);
  }
}
