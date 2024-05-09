import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntity } from './entities/journal.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { LessonsService } from '../lessons/lessons.service';

@Injectable()
export class JournalsService {
  constructor(
    @InjectRepository(JournalEntity)
    private readonly journalRepository: Repository<JournalEntity>,
    private readonly lessonsService: LessonsService,
  ) {}

  create(payload: CreateJournalDto[]): Promise<JournalEntity[]> {
    return this.journalRepository.save(payload);
  }

  findAll(where?: FindOptionsWhere<JournalEntity>, onlyIds: boolean = false) {
    if (onlyIds) {
      return this.journalRepository.find({
        select: ['id', 'lessonId', 'teacherId', 'studentId', 'date', 'type', 'mark', 'createdAt', 'updatedAt'],
        where,
      });
    }

    return this.journalRepository.find({ where, relations: ['lesson', 'teacher', 'student'] });
  }

  async findAllAvalibleLessons(userId: number) {
    const journals = await this.journalRepository.find({
      where: { studentId: userId },
      relations: ['lesson'],
    });

    const getLessonName = (id: number) => journals.find(({ lesson }) => lesson.id === id).lesson.name;
    const lessonsIds = new Set(journals.map(({ lesson }) => lesson.id));

    return Array.from(lessonsIds).map((id) => ({ id, name: getLessonName(id) }));
  }

  async findByLesson(userId: number, lessonId: number) {
    const [scores, lesson] = await Promise.all([
      this.findAll({ lessonId, studentId: userId }),
      this.lessonsService.findOne(lessonId),
    ]);

    if (!lesson) {
      throw new NotFoundException(`Not found lesson by id: '${lessonId}'`);
    }

    const marks = scores.map((j) => ({ id: j.id, date: j.date, type: j.type, mark: j.mark }));

    const revised = marks.filter(({ mark }) => mark == 'B').length;
    const skipped = marks.filter(({ mark }) => mark == 'H').length;
    const present = marks.length - skipped;

    const averageMark =
      marks.filter(({ mark }) => !isNaN(+mark)).reduce((acc, mark) => acc + +mark.mark, 0) / (marks.length - revised);

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

  findOne(id: number) {
    return this.journalRepository.findOne({ where: { id }, relations: ['lesson', 'teacher', 'student'] });
  }

  updateMany(payloads: UpdateJournalDto[]) {
    return Promise.all(payloads.map((payload) => this.journalRepository.update(payload.id, payload)));
  }

  removeMany(ids: number[]) {
    return this.journalRepository.delete(ids);
  }
}
