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

  create(createScheduleDto: CreateScheduleDto) {
    return this.scheduleRepository.save(createScheduleDto);
  }

  async findAll(findOptions: FindScheduleDto) {
    const where: FindOptionsWhere<ScheduleEntity> = {};

    if (findOptions.teacherId) where.teacherId = findOptions.teacherId;
    if (findOptions.classroomId) where.classroomId = findOptions.classroomId;
    if (findOptions.lessonId) where.lessonId = findOptions.lessonId;
    if (findOptions.groupId) where.groups = [{ id: findOptions.groupId }];

    if (findOptions.from && findOptions.to) {
      where.date = Between(findOptions.from, findOptions.to);
    } else if (findOptions.from) {
      where.date = MoreThanOrEqual(findOptions.from);
    } else if (findOptions.to) {
      where.date = LessThanOrEqual(findOptions.to);
    }

    return this.scheduleRepository
      .createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.classroom', 'classroom')
      .leftJoinAndSelect('schedule.teacher', 'teacher')
      .leftJoinAndSelect('schedule.groups', 'groups')
      .leftJoinAndSelect('schedule.lesson', 'lesson')
      .select([
        'schedule.id',
        'schedule.date',
        'schedule.startAt',
        'schedule.endAt',
        'schedule.type',
        'schedule.createdAt',
        'schedule.updatedAt',
        'lesson.id',
        'lesson.name',
        'teacher.id',
        'teacher.fullname',
        'teacher.email',
        'classroom.id',
        'classroom.name',
        'groups.id',
        'groups.name',
      ])
      .orderBy('schedule.date', 'DESC')
      .where(where)
      .getMany();
  }

  findOne(id: number) {
    return this.scheduleRepository.findOne({ where: { id }, relations: ['classroom', 'teacher', 'groups', 'lesson'] });
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleRepository.update(id, updateScheduleDto);
  }

  remove(id: number) {
    return this.scheduleRepository.delete(id);
  }
}
