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

  async createDefault(payloads: CreateVariableDto[]) {
    const hasKeys = await this.variableRepository.find({
      where: { key: In(payloads.map(({ key }) => key)) },
      select: ['key'],
    });

    const missingKeys = payloads.filter(({ key }) => !hasKeys.some((item) => item.key === key));
    return this.variableRepository.save(missingKeys);
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
