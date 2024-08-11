import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { LessonsService } from '../lessons/lessons.service';
import { PrismaService } from '@app/src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class JournalsService {
  private readonly journals = this.prismaService.journalModel;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly lessonsService: LessonsService,
  ) {}

  create(payload: CreateJournalDto) {
    return this.journals.create({ data: payload });
  }

  createMany(payloads: CreateJournalDto[]) {
    const data = payloads.map(this.prepareDataForCreation);
    return this.journals.createManyAndReturn({ data });
  }

  findAll(where?: Prisma.JournalModelWhereInput, onlyIds: boolean = false) {
    if (!onlyIds) {
      return this.journals.findMany({ where, include: { lesson: true, teacher: true, student: true } });
    }

    return this.journals.findMany({
      where,
      select: {
        teacherId: true,
        studentId: true,
        createdAt: true,
        updatedAt: true,
        lessonId: true,
        date: true,
        type: true,
        mark: true,
        id: true,
      },
    });
  }

  async findAllAvalibleLessons(userId: string) {
    const journals = await this.journals.findMany({
      where: { studentId: userId },
      include: { lesson: true },
    });

    const getLessonName = (id: string) => journals.find(({ lesson }) => lesson.id === id).lesson.name;
    const lessonsIds = new Set(journals.map(({ lesson }) => lesson.id));

    return Array.from(lessonsIds).map((id) => ({ id, name: getLessonName(id) }));
  }

  async findByLesson(userId: string, lessonId: string) {
    const [scores, lesson] = await Promise.all([
      this.findAll({ lessonId, studentId: userId }),
      this.lessonsService.findOne(lessonId),
    ]);

    if (!lesson) {
      throw new NotFoundException(`Not found lesson by id: '${lessonId}'`);
    }

    const marks = scores.map((j) => ({ id: j.id, date: j.date, type: j.type, mark: j.mark })).reverse();

    function getMarksBy(variants: string[]) {
      return marks.filter(({ mark }) => variants.filter((variant) => mark.toUpperCase() === variant).length);
    }

    const revised = getMarksBy(['В', 'B']).length;
    const skipped = getMarksBy(['Н', 'H']).length;
    const present = marks.length - skipped;

    const onlyNumericMarks = marks.filter(({ mark }) => !isNaN(+mark));
    const sum = onlyNumericMarks.reduce((acc, { mark }) => acc + +mark, 0);
    const averageMark = sum / onlyNumericMarks.length || 0.0;

    return {
      lessonId,
      lessonName: lesson.name,
      averageMark,
      attendance: {
        presentPercent: Math.floor((present / marks.length) * 100),
        skippedPercent: Math.floor((skipped / marks.length) * 100),
        revisedPercent: Math.floor((revised / marks.length) * 100),
      },
      marks,
    };
  }

  findOne(id: string) {
    return this.journals.findUnique({ where: { id }, include: { lesson: true, teacher: true, student: true } });
  }

  update(payload: UpdateJournalDto) {
    const { id, ...data } = payload;
    return this.journals.updateMany({ where: { id }, data });
  }

  remove(id: string) {
    return this.journals.delete({ where: { id } });
  }

  removeMany(ids: string[]) {
    return this.journals.deleteMany({ where: { id: { in: ids } } });
  }

  private prepareDataForCreation(payload: CreateJournalDto) {
    return { ...payload, id: uuidv7() };
  }
}
