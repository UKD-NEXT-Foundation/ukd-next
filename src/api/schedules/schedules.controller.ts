import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserModel } from '@prisma/client';

import { OptionalUser, Roles } from '@app/common/decorators';
import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { CreateScheduleDto } from './dto/create-schedule.dto';
import { FindScheduleDto } from './dto/find-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { SchedulesService } from './schedules.service';

@ApiBearerAuth()
@ApiTags('Schedules')
@Controller('/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post()
  create(@Body() payload: CreateScheduleDto) {
    return this.schedulesService.create(payload);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.schedulesService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Patch()
  update(@Body() payload: UpdateScheduleDto) {
    return this.schedulesService.update(payload);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @ApiBody({ type: UpdateScheduleDto, isArray: true })
  @Patch('/many')
  updateMany(@Body(new ParseArrayPipe({ items: UpdateScheduleDto })) payloads: UpdateScheduleDto[]) {
    return Promise.all(payloads.map(this.schedulesService.update));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.schedulesService.removeMany([id]);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @ApiBody({ type: Number, isArray: true })
  @Delete('/many')
  removeMany(@Body() ids: string[]) {
    return this.schedulesService.removeMany(ids);
  }
}
