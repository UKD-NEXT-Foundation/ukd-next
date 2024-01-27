import { Injectable } from '@nestjs/common';
import { CreateAuthSessionDto } from './dto/create-auth-session.dto';
import { UpdateAuthSessionDto } from './dto/update-auth-session.dto';
import { AuthSessionEntity } from './entities/auth-session.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthSessionsService {
  constructor(
    @InjectRepository(AuthSessionEntity)
    private readonly authSessionRepository: Repository<AuthSessionEntity>,
  ) {}

  create(payload: CreateAuthSessionDto) {
    return this.authSessionRepository.save(payload);
  }

  findAll() {
    return this.authSessionRepository.find();
  }

  findOne(id: number) {
    return this.authSessionRepository.findOneBy({ id });
  }

  async update(id: number, payload: UpdateAuthSessionDto, returnResults = true) {
    await this.authSessionRepository.update(id, payload);
    if (returnResults) return this.findOne(id);
    return null;
  }

  remove(id: number) {
    return this.authSessionRepository.delete(id);
  }
}
