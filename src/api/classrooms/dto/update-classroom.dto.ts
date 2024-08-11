import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { CreateClassroomDto } from './create-classroom.dto';

export class UpdateClassroomDto extends PartialType(CreateClassroomDto) {
  @ApiProperty()
  @IsUUID('7')
  id!: string;
}
