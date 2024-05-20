import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/decorators/user.decorator';
import { JournalEntity } from './entities/journal.entity';
import { FindAllJournalDto } from './dto/find-all-journal.dto';

@ApiBearerAuth()
@ApiTags('Journals')
@Controller('/journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @Post()
  @ApiBody({ type: JournalEntity, isArray: true })
  create(@Body() createJournalDto: CreateJournalDto[]) {
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

  @ApiResponse({ type: JournalEntity, isArray: true })
  @Get('/')
  findAll(@Query() query?: FindAllJournalDto) {
    const onlyIds = query.onlyIds;
    delete query.onlyIds;

    return this.journalsService.findAll(query, onlyIds);
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.journalsService.findOne(id);
  }

  @ApiBody({ type: UpdateJournalDto, isArray: true })
  @Patch('/many')
  updateMany(@Body() payloads: UpdateJournalDto[]) {
    return this.journalsService.updateMany(payloads);
  }

  @Patch('/')
  async update(@Body() payload: UpdateJournalDto) {
    return this.journalsService.updateMany([payload]).then((arr) => arr.pop());
  }

  @ApiBody({ type: Number, isArray: true })
  @Delete('/many')
  removeMany(@Body() ids: number[]) {
    return this.journalsService.removeMany(ids);
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.journalsService.removeMany([id]);
  }
}
