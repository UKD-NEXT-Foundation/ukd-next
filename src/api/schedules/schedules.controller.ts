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
import { UserModel } from '@prisma/client';

import { OptionalUser, Roles } from '@app/common/decorators';
import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { CreateScheduleDto } from './dto/create-schedule.dto';
import { FindScheduleDto } from './dto/find-schedule.dto';
import { ScheduleResponseDto } from './dto/schedule-response.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { SchedulesService } from './schedules.service';

@ApiBearerAuth()
@ApiTags('Schedules')
@Controller('/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ApiResponse({ type: ScheduleResponseDto, status: HttpStatus.CREATED })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post()
  create(@Body() payload: CreateScheduleDto) {
    return this.schedulesService.create(payload);
  }

  @ApiResponse({ type: ScheduleResponseDto, status: HttpStatus.CREATED, isArray: true })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post('/many')
  createMany(@Body(new ParseArrayPipe({ items: CreateScheduleDto })) payloads: CreateScheduleDto[]) {
    return this.schedulesService.createMany(payloads);
  }

  @ApiResponse({ type: ScheduleResponseDto, status: HttpStatus.OK, isArray: true })
  @Get()
  async findAll(@Query() query: FindScheduleDto, @OptionalUser() user: UserModel | null) {
    if (user?.groupId && !query?.groupId) {
      query.groupId = user.groupId;
    }

    return this.schedulesService.findAll(query);
  }

  @ApiResponse({ type: ScheduleResponseDto, status: HttpStatus.OK })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.schedulesService.findOne(id);
  }

  @ApiResponse({ type: ScheduleResponseDto, status: HttpStatus.OK })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Patch()
  update(@Body() payload: UpdateScheduleDto) {
    return this.schedulesService.update(payload);
  }

  @ApiResponse({ type: ScheduleResponseDto, status: HttpStatus.OK, isArray: true })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @ApiBody({ type: UpdateScheduleDto, isArray: true })
  @Patch('/many')
  updateMany(@Body(new ParseArrayPipe({ items: UpdateScheduleDto })) payloads: UpdateScheduleDto[]) {
    return Promise.all(payloads.map(this.schedulesService.update));
  }

  @ApiResponse({ type: ScheduleResponseDto, status: HttpStatus.OK })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.schedulesService.removeMany([id]);
  }

  @ApiResponse({ type: ScheduleResponseDto, status: HttpStatus.OK, isArray: true })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @ApiBody({ type: Number, isArray: true })
  @Delete('/many')
  removeMany(@Body() ids: string[]) {
    return this.schedulesService.removeMany(ids);
  }
}
