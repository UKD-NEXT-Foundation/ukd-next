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

import { Roles, User } from '@app/common/decorators';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enums/user-role.enum';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard, RolesGuard)
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @ApiBody({ type: CreateUserDto, isArray: true })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post('/many')
  createMany(@Body(new ParseArrayPipe({ items: CreateUserDto })) payloads: CreateUserDto[]) {
    return this.usersService.createMany(payloads);
  }

  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get()
  findAll(@Query() query: FindAllUsersDto) {
    return this.usersService.findAll(query);
  }

  @Get('/profile')
  findMe(@User() user: ReturnType<typeof this.findOne>) {
    return user;
  }

  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne({ id });
  }

  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Patch()
  update(@Body() payload: UpdateUserDto) {
    return this.usersService.update(payload);
  }

  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
