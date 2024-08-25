import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { Roles } from '../auth/decorators';
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsResponseDto } from './dto/news-response.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';

@ApiTags('News')
@Controller('/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({ type: NewsResponseDto, status: HttpStatus.CREATED })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post()
  create(@Body() payload: CreateNewsDto) {
    return this.newsService.create(payload);
  }

  @ApiResponse({ type: NewsResponseDto, status: HttpStatus.OK, isArray: true })
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @ApiResponse({ type: NewsResponseDto, status: HttpStatus.OK })
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.newsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({ type: NewsResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Patch()
  update(@Body() payload: UpdateNewsDto) {
    return this.newsService.update(payload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({ type: NewsResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.newsService.remove(id);
  }
}
