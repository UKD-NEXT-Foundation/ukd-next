import { Injectable } from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntity } from './entities/journal.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class JournalsService {
  constructor(
    @InjectRepository(JournalEntity)
    private readonly journalRepository: Repository<JournalEntity>,
  ) {}

  create(payload: CreateJournalDto) {
    return this.journalRepository.save(payload);
  }

  findAll(where?: FindOptionsWhere<JournalEntity>) {
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
    const result = await this.findAll({ lessonId, studentId: userId });
    const marks = result.map((j) => ({ id: j.id, date: j.date, type: j.type, mark: j.mark }));

    const revised = marks.filter(({ mark }) => mark == 'B').length;
    const skipped = marks.filter(({ mark }) => mark == 'H').length;
    const present = marks.length - skipped;

    const averageMark =
      marks.filter(({ mark }) => !isNaN(+mark)).reduce((acc, mark) => acc + +mark.mark, 0) / (marks.length - revised);

    return {
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

  update(id: number, payload: UpdateJournalDto) {
    return this.journalRepository.update(id, payload);
  }

  remove(id: number) {
    return this.journalRepository.delete(id);
  }
}
