import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ScheduleModel } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';

import { IsTime } from '@app/common/decorators';
import { formatTime } from '@app/common/functions';

import { ScheduleType } from '../enums/schedule-type.enum';

export class CreateScheduleDto implements Omit<ScheduleModel, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsUUID()
  lessonId!: string;

  @ApiPropertyOptional({ enum: ScheduleType, default: ScheduleType.Lecture })
  @IsOptional()
  @IsEnum(ScheduleType)
  type: ScheduleType;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isCanceled: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  teacherId!: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  classroomId!: string | null;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date!: Date;

  @ApiProperty({ example: '10:00' })
  @IsTime()
  @Transform(({ value }) => formatTime(value))
  startAt!: Date;

  @ApiProperty({ example: '11:20' })
  @IsTime()
  @Transform(({ value }) => formatTime(value))
  endAt!: Date;
}
