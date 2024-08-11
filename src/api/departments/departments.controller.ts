import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() payload: CreateDepartmentDto) {
    return this.departmentsService.create(payload);
  }

  @ApiBody({ type: CreateDepartmentDto, isArray: true })
  @Post('/many')
  createMany(@Body(new ParseArrayPipe({ items: CreateDepartmentDto })) payloads: CreateDepartmentDto[]) {
    return this.departmentsService.createMany(payloads);
  }

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.departmentsService.findOne(id);
  }

  @Patch()
  update(@Body() payload: UpdateDepartmentDto) {
    return this.departmentsService.update(payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.departmentsService.remove(id);
  }
}
