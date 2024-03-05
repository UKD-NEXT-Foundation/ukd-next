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
    return this.journalRepository.find({ where });
  }

  findOne(id: number) {
    return this.journalRepository.findOneBy({ id });
  }

  update(id: number, payload: UpdateJournalDto) {
    return this.journalRepository.update(id, payload);
  }

  remove(id: number) {
    return this.journalRepository.delete(id);
  }
}
