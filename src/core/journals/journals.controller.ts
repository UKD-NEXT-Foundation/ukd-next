import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserEntity } from '../users/entities/user.entity';
import { User } from '../auth/decorators/user.decorator';

@ApiBearerAuth()
@ApiTags('Journals')
// @UseGuards(AuthGuard, RolesGuard)
@Controller('/journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @Post()
  create(@Body() createJournalDto: CreateJournalDto) {
    return this.journalsService.create(createJournalDto);
  }

  @Get('/all-avalible-lesssons')
  findAllAvalibleLessons(@User('id') userId: number) {
    return this.journalsService.findAllAvalibleLessons(userId);
  }

  @Get('/by-lesson/:lessonId')
  findByLesson(@User('id') userId: number, @Param('lessonId', ParseIntPipe) lessonId: number) {
    return this.journalsService.findByLesson(userId, lessonId);
  }

  @Get('/')
  findAll() {
    return this.journalsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.journalsService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJournalDto: UpdateJournalDto) {
    return this.journalsService.update(id, updateJournalDto);
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.journalsService.remove(id);
  }
}
