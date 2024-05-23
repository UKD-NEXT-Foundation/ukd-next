import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { VariablesService } from './variables.service';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { AuthGuard, RolesGuard } from '@app/common/guards';
import { UserRole } from '../users/enums/user-role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { VariableEntity } from './entities/variable.entity';

@ApiBearerAuth()
@ApiTags('Variables')
// @UseGuards(AuthGuard, RolesGuard)
// @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
@Controller('variables')
export class VariablesController {
  constructor(private readonly variablesService: VariablesService) {}

  @ApiCreatedResponse({ type: VariableEntity, isArray: true })
  @ApiBody({ type: CreateVariableDto, isArray: true })
  @Post()
  create(@Body() payloads: CreateVariableDto[]) {
    return this.variablesService.create(payloads);
  }

  @ApiOkResponse({ type: VariableEntity, isArray: true })
  @ApiQuery({ name: 'keys', type: String, isArray: true, required: false })
  @Get()
  findAll(@Query('keys') keys: string[]) {
    if (keys) {
      keys = Array.isArray(keys) ? keys : [keys];
    }
    return this.variablesService.findAll(keys);
  }

  @ApiOkResponse({ type: VariableEntity })
  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.variablesService.findOne(key);
  }

  @ApiOkResponse({ type: Boolean })
  @Patch()
  update(@Body() payload: UpdateVariableDto) {
    return this.variablesService.update(payload);
  }

  @ApiOkResponse({ type: Boolean })
  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.variablesService.remove(key);
  }
}
