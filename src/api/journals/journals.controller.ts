import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles, User } from '@app/common/decorators';
import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { CreateJournalDto } from './dto/create-journal.dto';
import { FindAllJournalDto } from './dto/find-all-journal.dto';
import { JournalResponseDto } from './dto/journal-response.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { JournalsService } from './journals.service';

@ApiBearerAuth()
@ApiTags('Journals')
@UseGuards(AuthGuard, RolesGuard)
@Controller('/journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @ApiResponse({ type: JournalResponseDto, status: HttpStatus.CREATED })
  @Roles(UserRole.Teacher, UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post()
  create(@Body() payload: CreateJournalDto) {
    return this.journalsService.create(payload);
  }

  @ApiResponse({ type: JournalResponseDto, status: HttpStatus.CREATED, isArray: true })
  @Roles(UserRole.Teacher, UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
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

  @ApiResponse({ type: JournalResponseDto, status: HttpStatus.OK, isArray: true })
  @Roles(UserRole.Teacher, UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get()
  findAll(@Query() query?: FindAllJournalDto) {
    const onlyIds = query.onlyIds;
    delete query.onlyIds;

    return this.journalsService.findAll(query, onlyIds);
  }

  @ApiResponse({ type: JournalResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Teacher, UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.journalsService.findOne(id);
  }

  @ApiResponse({ type: JournalResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Teacher, UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Patch()
  async update(@Body() payload: UpdateJournalDto) {
    return this.journalsService.update(payload);
  }

  @ApiResponse({ type: JournalResponseDto, status: HttpStatus.OK, isArray: true })
  @Roles(UserRole.Teacher, UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @ApiBody({ type: UpdateJournalDto, isArray: true })
  @Patch('/many')
  updateMany(@Body(new ParseArrayPipe({ items: UpdateJournalDto })) payloads: UpdateJournalDto[]) {
    return Promise.all(payloads.map(this.journalsService.update));
  }

  @ApiResponse({ type: JournalResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Teacher, UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.journalsService.removeMany([id]);
  }

  @ApiResponse({ type: JournalResponseDto, status: HttpStatus.OK, isArray: true })
  @Roles(UserRole.Teacher, UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Delete('/many')
  removeMany(@Body() ids: string[]) {
    return this.journalsService.removeMany(ids);
  }
}
