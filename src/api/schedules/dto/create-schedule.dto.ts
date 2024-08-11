import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsOptional, IsEnum, IsBoolean, IsUUID } from 'class-validator';
import { ScheduleType } from '../enums/schedule-type.enum';
import { IsTime } from '@app/common/decorators';
import { formatTime } from '@app/common/functions';
import { ScheduleModel } from '@prisma/client';

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
