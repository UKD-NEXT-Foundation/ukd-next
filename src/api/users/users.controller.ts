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

import { Roles, User } from '@app/common/decorators';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRole } from './enums/user-role.enum';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard, RolesGuard)
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ type: UserResponseDto, status: HttpStatus.CREATED })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @ApiResponse({ type: UserResponseDto, status: HttpStatus.CREATED, isArray: true })
  @ApiBody({ type: CreateUserDto, isArray: true })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post('/many')
  createMany(@Body(new ParseArrayPipe({ items: CreateUserDto })) payloads: CreateUserDto[]) {
    return this.usersService.createMany(payloads);
  }

  @ApiResponse({ type: UserResponseDto, status: HttpStatus.OK, isArray: true })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get()
  findAll(@Query() query: FindAllUsersDto) {
    return this.usersService.findAll(query);
  }

  @ApiResponse({ type: UserResponseDto, status: HttpStatus.OK })
  @Get('/profile')
  findMe(@User() user: ReturnType<typeof this.findOne>) {
    return user;
  }

  @ApiResponse({ type: UserResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne({ id });
  }

  @ApiResponse({ type: UserResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Patch()
  update(@Body() payload: UpdateUserDto) {
    return this.usersService.update(payload);
  }

  @ApiResponse({ type: UserResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
