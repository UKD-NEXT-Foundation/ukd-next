import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LessonModel, Prisma } from '@prisma/client';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateLessonDto implements Omit<LessonModel, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  defaultTeacherId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  departmentId: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  classroomRequirements: Prisma.JsonValue;
}
