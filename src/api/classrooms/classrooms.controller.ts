import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Classrooms')
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
