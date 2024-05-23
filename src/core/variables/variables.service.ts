import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { VariableEntity } from './entities/variable.entity';

@Injectable()
export class VariablesService {
  constructor(
    @InjectRepository(VariableEntity)
    private readonly variableRepository: Repository<VariableEntity>,
  ) {}

  create(payloads: CreateVariableDto[]) {
    return this.variableRepository.save(payloads);
  }

  async createDefault(payload: CreateVariableDto) {
    const isHave = await this.findOne(payload.key);
    return isHave ?? this.variableRepository.save(payload);
  }

  findAll(keys?: string[]) {
    if (keys) {
      return this.variableRepository.findBy({ key: In(keys ?? []) });
    }
    return this.variableRepository.find();
  }

  findOne(key: string) {
    return this.variableRepository.findOneBy({ key });
  }

  async update({ key, value }: UpdateVariableDto) {
    const { affected } = await this.variableRepository.update(key, { value });
    return !!affected;
  }

  async remove(key: string) {
    const { affected } = await this.variableRepository.delete(key);
    return !!affected;
  }
}
