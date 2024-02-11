import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
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
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @ApiOkResponse({ type: ScheduleEntity })
  @Get()
  async findAll(@Query() query: FindScheduleDto) {
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
