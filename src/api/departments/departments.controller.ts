import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ParseArrayPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsService } from './departments.service';

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
