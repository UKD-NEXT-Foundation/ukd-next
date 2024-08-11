import { PartialType } from '@nestjs/mapped-types';
import { CreateClassroomDto } from './create-classroom.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateClassroomDto extends PartialType(CreateClassroomDto) {
  @ApiProperty()
  @IsUUID('7')
  id!: string;
}
