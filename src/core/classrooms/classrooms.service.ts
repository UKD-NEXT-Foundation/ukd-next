import { Injectable } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassroomEntity } from './entities/classroom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(ClassroomEntity)
    private readonly classroomsRepository: Repository<ClassroomEntity>,
  ) {}

  create(createClassroomDto: CreateClassroomDto) {
    return this.classroomsRepository.save(createClassroomDto);
  }

  findAll() {
    return this.classroomsRepository.find();
  }

  findOne(id: number) {
    return this.classroomsRepository.findOneBy({ id });
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return this.classroomsRepository.update(id, updateClassroomDto);
  }

  remove(id: number) {
    return this.classroomsRepository.delete(id);
  }
}
