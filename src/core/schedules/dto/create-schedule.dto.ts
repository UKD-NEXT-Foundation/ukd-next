import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ScheduleType } from '../enums/schedule-type.enum';
import { IsTime } from '@app/common/decorators';
import { formatTime } from '@app/common/functions';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNumber()
  lessonId!: number;

  @ApiPropertyOptional({ enum: ScheduleType, default: ScheduleType.Lecture })
  @IsOptional()
  @IsEnum(ScheduleType)
  type?: ScheduleType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  teacherId!: number  | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  classroomId!: number  | null;

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @IsNumber({}, { each: true })
  groupIds?: number[] | { id: number }[];

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date!: Date;

  @ApiProperty({ example: '10:00' })
  @IsTime()
  @Transform(({ value }) => formatTime(value))
  startAt!: string;

  @ApiProperty({ example: '11:20' })
  @IsTime()
  @Transform(({ value }) => formatTime(value))
  endAt!: string;
}
