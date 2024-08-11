import { Injectable } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { PrismaService } from '@app/src/database/prisma.service';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class ClassroomsService {
  private readonly classrooms = this.prismaService.classroomModel;

  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateClassroomDto) {
    return this.classrooms.create({ data: { ...payload, id: uuidv7() } });
  }

  findAll() {
    return this.classrooms.findMany();
  }

  findOne(id: string) {
    return this.classrooms.findUnique({ where: { id } });
  }

  update(payload: UpdateClassroomDto) {
    const { id, ...data } = payload;
    return this.classrooms.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.classrooms.delete({ where: { id } });
  }
}
