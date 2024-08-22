import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthGuard, RolesGuard } from '@app/common/guards';
import { AlwaysArrayPipe } from '@app/common/pipes';

import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/enums/user-role.enum';
import { CreateVariableDto } from '../dto/create-variable.dto';
import { UpdateVariableDto } from '../dto/update-variable.dto';
import { VariablesService } from '../variables.service';

@ApiBearerAuth()
@ApiTags('Variables')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
@Controller('/variables')
export class VariablesController {
  constructor(private readonly variablesService: VariablesService) {}

  @ApiBody({ type: CreateVariableDto })
  @Post()
  create(@Body() payload: CreateVariableDto) {
    return this.variablesService.create(payload);
  }

  @ApiBody({ type: CreateVariableDto, isArray: true })
  @Post('/many')
  createMany(@Body() payloads: CreateVariableDto[]) {
    return this.variablesService.createMany(payloads);
  }

  @ApiQuery({ name: 'keys', type: String, isArray: true, required: false })
  @Get()
  findAll(@Query('keys', AlwaysArrayPipe) keys: string[]) {
    return this.variablesService.findAll(keys);
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.variablesService.findOne(key);
  }

  @Patch()
  update(@Body() payload: UpdateVariableDto) {
    return this.variablesService.update(payload);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.variablesService.remove(key);
  }
}
