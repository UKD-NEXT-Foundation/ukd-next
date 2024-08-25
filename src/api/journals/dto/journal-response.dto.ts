import { ApiProperty } from '@nestjs/swagger';
import { JournalModel, ScheduleType } from '@prisma/client';

export class JournalResponseDto implements JournalModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  lessonId: string;

  @ApiProperty()
  teacherId: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty({ default: null })
  date: Date | null;

  @ApiProperty({ enum: ScheduleType, default: ScheduleType.LECTURE })
  type: ScheduleType | null;

  @ApiProperty({ maxLength: 3 })
  mark: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
