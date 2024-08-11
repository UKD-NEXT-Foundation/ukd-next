import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JournalModel } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

import { ScheduleType } from '@app/common/enums';

export class CreateJournalDto implements Omit<JournalModel, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsUUID()
  lessonId!: string;

  @ApiProperty()
  @IsUUID()
  teacherId!: string;

  @ApiProperty()
  @IsUUID()
  studentId!: string;

  @ApiPropertyOptional({ enum: ScheduleType, default: ScheduleType.Lecture, nullable: true })
  @IsOptional()
  @IsEnum(ScheduleType)
  type: ScheduleType | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date: Date | null;

  @ApiProperty({ example: '4' })
  @IsString()
  @Transform(({ value }) => value.trim().toUpperCase())
  @MinLength(1)
  @MaxLength(3)
  mark!: string;
}
