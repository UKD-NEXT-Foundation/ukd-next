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
    const where: FindOptionsWhere<ScheduleEntity> = findOptions;

    if (findOptions.from && findOptions.to) {
      where.startAt = Between(findOptions.from, findOptions.to);
    } else {
      where.startAt = findOptions.from
        ? MoreThanOrEqual(findOptions.from)
        : findOptions.to
          ? LessThanOrEqual(findOptions.to)
          : undefined;
    }

    delete where['from'];
    delete where['to'];

    return this.scheduleRepository.find({ where, relations: ['classroom', 'teacher', 'groups', 'lessson'] });
  }

  findOne(id: number) {
    return this.scheduleRepository.findOne({ where: { id }, relations: ['classroom', 'teacher', 'groups', 'lessson'] });
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleRepository.update(id, updateScheduleDto);
  }

  remove(id: number) {
    return this.scheduleRepository.delete(id);
  }
}
