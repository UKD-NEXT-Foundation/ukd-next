import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles, User } from '@app/common/decorators';
import { AuthGuard, RolesGuard } from '@app/common/guards';
import { UserRole } from './enums/user-role.enum';
import { UserEntity } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: UserEntity })
  @Roles(UserRole.Moderator)
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({ type: UserEntity })
  @Get('/me')
  findMe(@User() user: UserEntity) {
    return user;
  }

  @ApiOkResponse({ type: UserEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne({ id });
  }

  @ApiBody({ type: UpdateUserDto })
  @Roles(UserRole.Moderator)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Roles(UserRole.Moderator)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
