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
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ScheduleEntity } from './entities/schedule.entity';
import { FindScheduleDto } from './dto/find-schedule.dto';
import { OptionalUser } from '@app/common/decorators';
import { UserEntity } from '../users/entities/user.entity';

@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ApiCreatedResponse({ type: ScheduleEntity, isArray: true })
  @ApiBody({ type: CreateScheduleDto, isArray: true })
  @Post()
  create(@Body() payloads: CreateScheduleDto[]) {
    payloads.forEach((payload) => {
      payload.groups = payload.groupIds?.map((id) => ({ id }));

      if (new Date(`1970-01-01T${payload.startAt}`) > new Date(`1970-01-01T${payload.endAt}`)) {
        throw new ConflictException('endAt must not be less than startAt');
      }
    });

    return this.schedulesService.create(payloads);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ScheduleEntity, isArray: true })
  @Get()
  async findAll(@Query() query: FindScheduleDto, @OptionalUser() user: UserEntity | null) {
    if (user?.group && !query?.groupId) {
      query.groupId = user.group.id;
    }
    return this.schedulesService.findAll(query);
  }

  @ApiOkResponse({ type: ScheduleEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.schedulesService.findOne(id);
  }

  @ApiBody({ type: UpdateScheduleDto, isArray: true })
  @Patch('/many')
  updateMany(@Body() payloads: UpdateScheduleDto[]) {
    return this.schedulesService.updateMany(payloads);
  }

  @Patch()
  update(@Body() updateScheduleDto: UpdateScheduleDto) {
    return this.schedulesService.updateMany([updateScheduleDto]);
  }

  @ApiBody({ type: Number, isArray: true })
  @Delete('/many')
  removeMany(@Body() ids: number[]) {
    return this.schedulesService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.schedulesService.removeMany([id]);
  }
}
