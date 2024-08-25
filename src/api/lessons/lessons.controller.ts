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

import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { Roles } from '../auth/decorators';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonResponseDto } from './dto/lesson-response.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonsService } from './lessons.service';

@ApiBearerAuth()
@ApiTags('Lessons')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
@Controller('/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiResponse({ type: LessonResponseDto, status: HttpStatus.CREATED })
  @Post()
  create(@Body() payload: CreateLessonDto) {
    return this.lessonsService.create(payload);
  }

  @ApiResponse({ type: LessonResponseDto, status: HttpStatus.OK, isArray: true })
  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @ApiResponse({ type: LessonResponseDto, status: HttpStatus.OK })
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.lessonsService.findOne(id);
  }

  @ApiResponse({ type: LessonResponseDto, status: HttpStatus.OK })
  @Patch()
  update(@Body() payload: UpdateLessonDto) {
    return this.lessonsService.update(payload);
  }

  @ApiResponse({ type: LessonResponseDto, status: HttpStatus.OK })
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.lessonsService.remove(id);
  }
}
