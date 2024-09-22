import { ApiProperty } from '@nestjs/swagger';
import { ScheduleModel, ScheduleType } from '@prisma/client';

export class ScheduleResponseDto implements ScheduleModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  startAt: string;

  @ApiProperty()
  endAt: string;

  @ApiProperty({ enum: ScheduleType, default: ScheduleType.LECTURE })
  type: ScheduleType | null;

  @ApiProperty({ default: false })
  isCanceled: boolean;

  @ApiProperty()
  lessonId: string;

  @ApiProperty({ default: null })
  teacherId: string | null;

  @ApiProperty({ default: null })
  classroomId: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
