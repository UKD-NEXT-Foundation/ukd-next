import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ConflictException,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ScheduleEntity } from './entities/schedule.entity';
import { FindScheduleDto } from './dto/find-schedule.dto';

@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ApiCreatedResponse({ type: ScheduleEntity })
  @Post()
  create(@Body() payload: CreateScheduleDto) {
    payload.groupIds = payload.groupIds?.map((id) => ({ id }));

    if (new Date(`1970-01-01T${payload.startAt}`) > new Date(`1970-01-01T${payload.endAt}`)) {
      throw new ConflictException('endAt must not be less than startAt');
    }

    return this.schedulesService.create(payload);
  }

  @ApiOkResponse({ type: ScheduleEntity, isArray: true })
  @Get()
  async findAll(@Query() query: FindScheduleDto) {
    if (query.groupId) {
      query['groups'] = { id: query.groupId };
      delete query.groupId;
    }

    return this.schedulesService.findAll(query);
  }

  @ApiOkResponse({ type: ScheduleEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.schedulesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.schedulesService.remove(id);
  }
}
