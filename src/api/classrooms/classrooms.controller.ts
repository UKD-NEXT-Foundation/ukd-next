import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { Roles } from '../auth/decorators';
import { ClassroomsService } from './classrooms.service';
import { ClassroomResponseDto } from './dto/classroom-response.dto';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@ApiTags('Classrooms')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
@Controller('/classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @ApiResponse({ type: ClassroomResponseDto, status: HttpStatus.CREATED })
  @Post()
  create(@Body() payload: CreateClassroomDto) {
    return this.classroomsService.create(payload);
  }

  @ApiResponse({ type: ClassroomResponseDto, status: HttpStatus.OK, isArray: true })
  @Get()
  findAll() {
    return this.classroomsService.findAll();
  }

  @ApiResponse({ type: ClassroomResponseDto, status: HttpStatus.OK })
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.classroomsService.findOne(id);
  }

  @ApiResponse({ type: ClassroomResponseDto, status: HttpStatus.OK })
  @Patch()
  update(@Body() payload: UpdateClassroomDto) {
    return this.classroomsService.update(payload);
  }

  @ApiResponse({ type: ClassroomResponseDto, status: HttpStatus.OK })
  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.classroomsService.remove(id);
  }
}
