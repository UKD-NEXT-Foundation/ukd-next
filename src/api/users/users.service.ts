import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@app/src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class UsersService {
  private readonly users = this.prismaService.userModel;

  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateUserDto) {
    const data = this.prepareDataForCreation(payload);
    return this.users.create({ data });
  }

  createMany(payloads: CreateUserDto[]) {
    const data = payloads.map(this.prepareDataForCreation);
    return this.users.createManyAndReturn({ data });
  }

  findAll(where?: Prisma.UserModelWhereInput) {
    return this.users.findMany({ where, include: { group: true } });
  }

  findOne(where: Prisma.UserModelWhereUniqueInput) {
    return this.users.findUnique({
      include: { group: { include: { leader: true, curator: true } } },
      where,
    });
  }

  update(payload: UpdateUserDto) {
    const { id, ...data } = payload;
    return this.users.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.users.delete({ where: { id } });
  }

  private prepareDataForCreation(payload: CreateUserDto) {
    return { ...payload, id: uuidv7(), email: payload.email.toLowerCase() };
  }
}
