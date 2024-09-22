import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { v7 as uuidv7 } from 'uuid';

import { PrismaService } from '@app/src/database/prisma.service';

import { CreateScheduleDto } from './dto/create-schedule.dto';
import { FindScheduleDto } from './dto/find-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  private readonly schedules = this.prismaService.scheduleModel;

  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateScheduleDto) {
    const data = this.prepareDataForCreation(payload);
    return this.schedules.create({ data });
  }

  createMany(payloads: CreateScheduleDto[]) {
    return Promise.all(payloads.map(this.create.bind(this)));
  }

  async findAll(findOptions?: FindScheduleDto) {
    if (
      !findOptions.findAll &&
      !findOptions.classroomId &&
      !findOptions.lessonId &&
      !findOptions.teacherId &&
      !findOptions.groupId
    ) {
      return [];
    }

    const where: Prisma.ScheduleModelWhereInput = {
      groups: findOptions.groupId && !findOptions.findAll ? { some: { id: findOptions.groupId } } : undefined,
      classroomId: findOptions.classroomId && !findOptions.findAll ? findOptions.classroomId : undefined,
      teacherId: findOptions.teacherId && !findOptions.findAll ? findOptions.teacherId : undefined,
      lessonId: findOptions.lessonId && !findOptions.findAll ? findOptions.lessonId : undefined,
      date:
        findOptions.from || findOptions.to
          ? {
              gte: findOptions.from,
              lte: findOptions.to,
            }
          : undefined,
    };

    const select: Prisma.ScheduleModelSelect = {
      id: true,
      date: true,
      startAt: true,
      endAt: true,
      type: true,
      createdAt: true,
      updatedAt: true,
      isCanceled: true,
    };

    if (findOptions.onlyIds) {
      select.lessonId = true;
      select.teacherId = true;
      select.classroomId = true;
      select.groups = { select: { id: true } };
    } else {
      select.lesson = { select: { id: true, name: true } };
      select.teacher = { select: { id: true, fullname: true, email: true } };
      select.classroom = { select: { id: true, name: true, isOnline: true, onlineLink: true } };
      select.groups = { select: { id: true, name: true } };
    }

    return this.schedules.findMany({ select, where, orderBy: [{ date: 'asc' }, { startAt: 'asc' }] });
  }

  findOne(id: string) {
    return this.schedules.findUnique({
      where: { id },
      include: { classroom: true, lesson: true, groups: true, teacher: true },
    });
  }

  update(payload: UpdateScheduleDto) {
    const { id, ...data } = payload;
    return this.schedules.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.schedules.delete({ where: { id } });
  }

  removeMany(ids: string[]) {
    return this.schedules.deleteMany({ where: { id: { in: ids } } });
  }

  private prepareDataForCreation(payload: CreateScheduleDto) {
    if (new Date(`1970-01-01T${payload.startAt}`) > new Date(`1970-01-01T${payload.endAt}`)) {
      throw new ConflictException('endAt must not be less than startAt');
    }

    payload['groups'] = { connect: payload.groupIds.map((id) => ({ id })) };
    delete payload.groupIds;

    return { ...payload, id: uuidv7() };
  }
}
