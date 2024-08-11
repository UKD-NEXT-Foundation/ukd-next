import { Injectable } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';

import { PrismaService } from '@app/src/database/prisma.service';

import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  private readonly lessons = this.prismaService.lessonModel;

  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateLessonDto) {
    return this.lessons.create({ data: { ...payload, id: uuidv7() } });
  }

  findAll() {
    return this.lessons.findMany({ include: { department: true } });
  }

  findOne(id: string) {
    return this.lessons.findUnique({ where: { id } });
  }

  update(payload: UpdateLessonDto) {
    const { id, ...data } = payload;
    return this.lessons.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.lessons.delete({ where: { id } });
  }
}
