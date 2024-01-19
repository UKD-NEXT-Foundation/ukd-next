import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AuthSessionsService } from './auth-sessions.service';
import { CreateAuthSessionDto } from './dto/create-auth-session.dto';
import { UpdateAuthSessionDto } from './dto/update-auth-session.dto';

@Controller('auth-sessions')
export class AuthSessionsController {
  constructor(private readonly authSessionsService: AuthSessionsService) {}

  @Post()
  create(@Body() payload: CreateAuthSessionDto) {
    return this.authSessionsService.create(payload);
  }

  @Get()
  findAll() {
    return this.authSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authSessionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateAuthSessionDto) {
    return this.authSessionsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authSessionsService.remove(id);
  }
}
