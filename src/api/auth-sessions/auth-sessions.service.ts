import { Injectable } from '@nestjs/common';
import { CreateAuthSessionDto } from './dto/create-auth-session.dto';
import { UpdateAuthSessionDto } from './dto/update-auth-session.dto';
import { PrismaService } from '@app/src/database/prisma.service';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class AuthSessionsService {
  private readonly authSessions = this.prismaService.authSessionModel;

  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateAuthSessionDto) {
    return this.authSessions.create({ data: { ...payload, id: uuidv7() } });
  }

  findAll() {
    return this.authSessions.findMany();
  }

  findOne(id: string) {
    return this.authSessions.findUnique({ where: { id } });
  }

  update(payload: UpdateAuthSessionDto) {
    const { id, ...data } = payload;
    return this.authSessions.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.authSessions.delete({ where: { id } });
  }
}
