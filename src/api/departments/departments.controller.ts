import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';

import { Roles } from '../auth/decorators';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentResponseDto } from './dto/department-response.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('Departments')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
@Controller('/departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @ApiResponse({ type: DepartmentResponseDto, status: HttpStatus.CREATED })
  @Post()
  create(@Body() payload: CreateDepartmentDto) {
    return this.departmentsService.create(payload);
  }

  @ApiResponse({ type: DepartmentResponseDto, status: HttpStatus.CREATED, isArray: true })
  @Post('/many')
  createMany(@Body(new ParseArrayPipe({ items: CreateDepartmentDto })) payloads: CreateDepartmentDto[]) {
    return this.departmentsService.createMany(payloads);
  }

  @ApiResponse({ type: DepartmentResponseDto, status: HttpStatus.OK, isArray: true })
  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @ApiResponse({ type: DepartmentResponseDto, status: HttpStatus.OK })
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.departmentsService.findOne(id);
  }

  @ApiResponse({ type: DepartmentResponseDto, status: HttpStatus.OK })
  @Patch()
  update(@Body() payload: UpdateDepartmentDto) {
    return this.departmentsService.update(payload);
  }

  @ApiResponse({ type: DepartmentResponseDto, status: HttpStatus.OK })
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.departmentsService.remove(id);
  }
}
