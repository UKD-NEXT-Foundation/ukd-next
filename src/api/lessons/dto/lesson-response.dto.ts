import { ApiProperty } from '@nestjs/swagger';
import { LessonModel, Prisma } from '@prisma/client';

export class LessonResponseDto implements LessonModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ default: null })
  departmentId: string | null;

  @ApiProperty({ default: {} })
  classroomRequirements: Prisma.JsonValue;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
