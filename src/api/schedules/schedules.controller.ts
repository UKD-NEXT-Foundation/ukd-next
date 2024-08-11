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
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FindScheduleDto } from './dto/find-schedule.dto';
import { OptionalUser } from '@app/common/decorators';
import { UserModel } from '@prisma/client';

@ApiTags('Schedules')
@Controller('/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  create(@Body() payload: CreateScheduleDto) {
    return this.schedulesService.create(payload);
  }

  @Post('/many')
  createMany(@Body(new ParseArrayPipe({ items: CreateScheduleDto })) payloads: CreateScheduleDto[]) {
    return this.schedulesService.createMany(payloads);
  }

  @ApiBearerAuth()
  @Get()
  async findAll(@Query() query: FindScheduleDto, @OptionalUser() user: UserModel | null) {
    if (user?.groupId && !query?.groupId) {
      query.groupId = user.groupId;
    }

    return this.schedulesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.schedulesService.findOne(id);
  }

  @Patch()
  update(@Body() payload: UpdateScheduleDto) {
    return this.schedulesService.update(payload);
  }

  @ApiBody({ type: UpdateScheduleDto, isArray: true })
  @Patch('/many')
  updateMany(@Body(new ParseArrayPipe({ items: UpdateScheduleDto })) payloads: UpdateScheduleDto[]) {
    return Promise.all(payloads.map(this.schedulesService.update));
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.schedulesService.removeMany([id]);
  }

  @ApiBody({ type: Number, isArray: true })
  @Delete('/many')
  removeMany(@Body() ids: string[]) {
    return this.schedulesService.removeMany(ids);
  }
}
