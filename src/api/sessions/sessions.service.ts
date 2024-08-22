import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@app/src/database/prisma.service';

import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
  private readonly sessions = this.prismaService.sessionModel;

  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateSessionDto) {
    return this.sessions.create({ data: payload });
  }

  async findAll(where?: Prisma.SessionModelWhereInput, hideNotificationCredentials = true) {
    const sessions = await this.sessions.findMany({ where });

    if (hideNotificationCredentials) {
      return sessions.map((s) => ({ ...s, notificationCredentials: null }));
    }

    return sessions;
  }

  findOne(id: string) {
    return this.sessions.findUnique({ where: { id } });
  }

  update(payload: UpdateSessionDto) {
    const { id, ...data } = payload;
    return this.sessions.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.sessions.delete({ where: { id } });
  }
}
