import { Injectable } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';

import { PrismaService } from '@app/src/database/prisma.service';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  private readonly departments = this.prismaService.departmentModel;

  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateDepartmentDto) {
    const data = this.prepareDataForCreation(payload);
    return this.departments.create({ data });
  }

  createMany(payloads: CreateDepartmentDto[]) {
    const data = payloads.map(this.prepareDataForCreation);
    return this.departments.createManyAndReturn({ data });
  }

  findAll() {
    return this.departments.findMany({ include: { headOfDepartment: true } });
  }

  findOne(id: string) {
    return this.departments.findUnique({ where: { id } });
  }

  update(payload: UpdateDepartmentDto) {
    const { id, ...data } = payload;
    return this.departments.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.departments.delete({ where: { id } });
  }

  private prepareDataForCreation(payload: CreateDepartmentDto) {
    return { ...payload, id: uuidv7() };
  }
}
