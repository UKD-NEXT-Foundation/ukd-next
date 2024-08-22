import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { v7 as uuidv7 } from 'uuid';

import { PrismaService } from '@app/src/database/prisma.service';

import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  private readonly news = this.prismaService.newsModel;

  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateNewsDto) {
    return this.news.create({ data: { ...payload, id: uuidv7() } });
  }

  findAll(where?: Prisma.NewsModelWhereInput) {
    return this.news.findMany({ where, orderBy: { createdAt: 'desc' }, include: { author: true } });
  }

  findOne(id: string) {
    return this.news.findUnique({ where: { id }, include: { author: true } });
  }

  update(payload: UpdateNewsDto) {
    const { id, ...data } = payload;
    return this.news.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.news.delete({ where: { id } });
  }
}
