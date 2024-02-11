import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from './entities/schedule.entity';
import { FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  create(createScheduleDto: CreateScheduleDto) {
    return this.scheduleRepository.save(createScheduleDto);
  }

  async findAll(findOptions: FindOptionsWhere<ScheduleEntity>) {
    const where: FindOptionsWhere<ScheduleEntity> = findOptions;

    where.startAt = LessThanOrEqual(where.startAt);
    where.endAt = MoreThanOrEqual(where.endAt);

    return this.scheduleRepository.find({ where });
  }

  findOne(id: number) {
    return this.scheduleRepository.findOneBy({ id });
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleRepository.update(id, updateScheduleDto);
  }

  remove(id: number) {
    return this.scheduleRepository.delete(id);
  }
}
