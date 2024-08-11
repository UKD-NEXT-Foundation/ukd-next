import { Injectable } from '@nestjs/common';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { PrismaService } from '@app/src/database/prisma.service';

@Injectable()
export class VariablesService {
  private readonly variables = this.prismaService.variableModel;

  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateVariableDto) {
    this.variables.create({ data: payload });
  }

  createMany(payloads: CreateVariableDto[]) {
    return this.variables.createManyAndReturn({ data: payloads });
  }

  async createDefault(payload: CreateVariableDto) {
    const isHave = await this.findOne(payload.key);
    return isHave ?? this.variables.create({ data: payload });
  }

  findAll(keys: string[] = []) {
    return this.variables.findMany({ where: { key: keys.length ? { in: keys } : {} } });
  }

  findOne(key: string) {
    return this.variables.findUnique({ where: { key } });
  }

  update({ key, value }: UpdateVariableDto) {
    return this.variables.update({ where: { key }, data: { value } });
  }

  remove(key: string) {
    return this.variables.delete({ where: { key } });
  }
}
