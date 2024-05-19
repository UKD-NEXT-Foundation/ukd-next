import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from './entities/schedule.entity';
import { FindOptionsWhere, Between, Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { FindScheduleDto } from './dto/find-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  create(payload: CreateScheduleDto[]) {
    return this.scheduleRepository.save(payload);
  }

  async findAll(findOptions: FindScheduleDto) {
    if (
      !findOptions.findAll &&
      !findOptions.classroomId &&
      !findOptions.lessonId &&
      !findOptions.teacherId &&
      !findOptions.groupId
    ) {
      return [];
    }

    const where: FindOptionsWhere<ScheduleEntity> = {};

    if (findOptions.teacherId && !findOptions.findAll) where.teacherId = findOptions.teacherId;
    if (findOptions.classroomId && !findOptions.findAll) where.classroomId = findOptions.classroomId;
    if (findOptions.lessonId && !findOptions.findAll) where.lessonId = findOptions.lessonId;

    if (findOptions.from && findOptions.to) {
      where.date = Between(findOptions.from, findOptions.to);
    } else if (findOptions.from) {
      where.date = MoreThanOrEqual(findOptions.from);
    } else if (findOptions.to) {
      where.date = LessThanOrEqual(findOptions.to);
    }

    const builder = this.scheduleRepository
      .createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.groups', 'groups')
      .select([
        'schedule.id',
        'schedule.date',
        'schedule.startAt',
        'schedule.endAt',
        'schedule.type',
        'schedule.createdAt',
        'schedule.updatedAt',
        'schedule.isCanceled',
      ]);

    if (findOptions.onlyIds) {
      builder.addSelect(['schedule.lessonId', 'schedule.teacherId', 'schedule.classroomId', 'groups.id']);
    } else {
      builder
        .leftJoinAndSelect('schedule.classroom', 'classroom')
        .leftJoinAndSelect('schedule.teacher', 'teacher')
        .leftJoinAndSelect('schedule.lesson', 'lesson')
        .addSelect([
          'lesson.id',
          'lesson.name',
          'teacher.id',
          'teacher.fullname',
          'teacher.email',
          'classroom.id',
          'classroom.name',
          'classroom.isOnline',
          'classroom.onlineLink',
          'groups.id',
          'groups.name',
        ]);
    }

    builder.orderBy('schedule.date', 'ASC').addOrderBy('schedule.startAt', 'ASC').where(where);

    if (findOptions?.groupId && !findOptions.findAll) {
      builder.andWhere('groups.id = :groupId', findOptions);
    }

    return builder.getMany();
  }

  findOne(id: number) {
    return this.scheduleRepository.findOne({ where: { id }, relations: ['classroom', 'teacher', 'groups', 'lesson'] });
  }

  updateMany(payloads: UpdateScheduleDto[]) {
    return Promise.all(payloads.map((payload) => this.scheduleRepository.update(payload.id, payload)));
  }

  removeMany(ids: number[]) {
    return this.scheduleRepository.delete(ids);
  }
}
