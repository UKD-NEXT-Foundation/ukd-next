import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { JournalsService } from './journals.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FindAllJournalDto } from './dto/find-all-journal.dto';
import { User } from '@app/common/decorators';

@ApiBearerAuth()
@ApiTags('Journals')
@Controller('/journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @Post()
  create(@Body() payload: CreateJournalDto) {
    return this.journalsService.create(payload);
  }

  @Post('/many')
  createMany(@Body(new ParseArrayPipe({ items: CreateJournalDto })) payloads: CreateJournalDto[]) {
    return this.journalsService.createMany(payloads);
  }

  @Get('/all-avalible-lesssons')
  findAllAvalibleLessons(@User('id') userId: string) {
    return this.journalsService.findAllAvalibleLessons(userId);
  }

  @Get('/by-lesson/:lessonId')
  findByLesson(@Param('lessonId', ParseUUIDPipe) lessonId: string, @User('id') userId: string) {
    return this.journalsService.findByLesson(userId, lessonId);
  }

  @Get()
  findAll(@Query() query?: FindAllJournalDto) {
    const onlyIds = query.onlyIds;
    delete query.onlyIds;

    return this.journalsService.findAll(query, onlyIds);
  }

  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.journalsService.findOne(id);
  }

  @Patch()
  async update(@Body() payload: UpdateJournalDto) {
    return this.journalsService.update(payload);
  }

  @ApiBody({ type: UpdateJournalDto, isArray: true })
  @Patch('/many')
  updateMany(@Body(new ParseArrayPipe({ items: UpdateJournalDto })) payloads: UpdateJournalDto[]) {
    return Promise.all(payloads.map(this.journalsService.update));
  }

  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.journalsService.removeMany([id]);
  }

  @Delete('/many')
  removeMany(@Body() ids: string[]) {
    return this.journalsService.removeMany(ids);
  }
}
