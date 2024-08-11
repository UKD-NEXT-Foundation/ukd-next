import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @ApiProperty()
  @IsUUID('7')
  id!: string;
}
