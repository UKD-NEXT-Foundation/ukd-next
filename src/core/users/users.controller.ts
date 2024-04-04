import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles, User } from '@app/common/decorators';
import { AuthGuard, RolesGuard } from '@app/common/guards';
import { UserRole } from './enums/user-role.enum';
import { UserEntity } from './entities/user.entity';
import { FindAllUsersDto } from './dto/find-all-users.dto';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: UserEntity })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get()
  findAll(@Query() query: FindAllUsersDto) {
    return this.usersService.findAll(query);
  }

  @ApiOkResponse({ type: UserEntity })
  @Get('/profile')
  findMe(@User() user: UserEntity) {
    return {
      ...user,
      group: user.group
        ? {
            id: user.group.id,
            name: user.group.name,
            elder: user.group.elder
              ? {
                  id: user.group.elder.id,
                  email: user.group.elder.email,
                  fullname: user.group.elder.fullname,
                  phone: user.group.elder.phone,
                }
              : null,
            curator: user.group.curator
              ? {
                  id: user.group.curator.id,
                  email: user.group.curator.email,
                  fullname: user.group.curator.fullname,
                  phone: user.group.curator.phone,
                }
              : null,
          }
        : null,
    };
  }

  @ApiOkResponse({ type: UserEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne({ id });
  }

  @ApiBody({ type: UpdateUserDto })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
