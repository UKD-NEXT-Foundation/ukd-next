import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GroupEntity } from './entities/group.entity';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiCreatedResponse({ type: GroupEntity, isArray: true })
  @Post()
  create(@Body() payload: CreateGroupDto[]) {
    return this.groupsService.create(payload);
  }

  @ApiOkResponse({ type: GroupEntity, isArray: true })
  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @ApiOkResponse({ type: GroupEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateGroupDto) {
    return this.groupsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.remove(id);
  }
}
