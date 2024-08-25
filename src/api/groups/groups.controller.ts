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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { Roles } from '../auth/decorators';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupResponseDto } from './dto/group-response.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';

@ApiTags('Groups')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
@Controller('/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiResponse({ type: GroupResponseDto, status: HttpStatus.CREATED })
  @Post()
  create(@Body() payload: CreateGroupDto) {
    return this.groupsService.create(payload);
  }

  @ApiResponse({ type: GroupResponseDto, status: HttpStatus.CREATED, isArray: true })
  @ApiBody({ type: CreateGroupDto, isArray: true })
  @Post('/many')
  createMany(@Body(new ParseArrayPipe({ items: CreateGroupDto })) payloads: CreateGroupDto[]) {
    return this.groupsService.createMany(payloads);
  }

  @ApiResponse({ type: GroupResponseDto, status: HttpStatus.OK, isArray: true })
  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @ApiResponse({ type: GroupResponseDto, status: HttpStatus.OK })
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.groupsService.findOne(id);
  }

  @ApiResponse({ type: GroupResponseDto, status: HttpStatus.OK })
  @Patch()
  update(@Body() payload: UpdateGroupDto) {
    return this.groupsService.update(payload);
  }

  @ApiResponse({ type: GroupResponseDto, status: HttpStatus.OK })
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.groupsService.remove(id);
  }
}
