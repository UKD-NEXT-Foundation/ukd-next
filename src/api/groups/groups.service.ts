import { Injectable } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';

import { PrismaService } from '@app/src/database/prisma.service';

import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  private readonly groups = this.prismaService.groupModel;

  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateGroupDto) {
    const data = this.prepareDataForCreation(payload);
    return this.groups.create({ data });
  }

  createMany(payloads: CreateGroupDto[]) {
    const data = payloads.map(this.prepareDataForCreation);
    return this.groups.createManyAndReturn({ data });
  }

  findAll() {
    return this.groups.findMany({ include: { students: true } });
  }

  findOne(id: string) {
    return this.groups.findUnique({ where: { id } });
  }

  update(payload: UpdateGroupDto) {
    const { id, ...data } = payload;
    return this.groups.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.groups.delete({ where: { id } });
  }

  private prepareDataForCreation(payload: CreateGroupDto) {
    return { ...payload, id: uuidv7() };
  }
}
