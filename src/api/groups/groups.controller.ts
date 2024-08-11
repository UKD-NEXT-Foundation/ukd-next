import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';

@ApiTags('Groups')
@Controller('/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() payload: CreateGroupDto) {
    return this.groupsService.create(payload);
  }

  @ApiBody({ type: CreateGroupDto, isArray: true })
  @Post('/many')
  createMany(@Body(new ParseArrayPipe({ items: CreateGroupDto })) payloads: CreateGroupDto[]) {
    return this.groupsService.createMany(payloads);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.groupsService.findOne(id);
  }

  @Patch()
  update(@Body() payload: UpdateGroupDto) {
    return this.groupsService.update(payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.groupsService.remove(id);
  }
}
