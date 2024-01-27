import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './entities/lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>
  ) {}

  create(createLessonDto: CreateLessonDto) {
    return this.lessonRepository.save(createLessonDto);
  }

  findAll() {
    return this.lessonRepository.find();
  }

  findOne(id: string) {
    return this.lessonRepository.findOneBy({ id });
  }

  update(id: string, updateLessonDto: UpdateLessonDto) {
    return this.lessonRepository.update(id, updateLessonDto);
  }

  remove(id: string) {
    return this.lessonRepository.delete(id);
  }
}
