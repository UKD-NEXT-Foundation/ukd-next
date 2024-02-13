import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsNumber, IsObject, IsEnum } from 'class-validator';
import { ScheduleType } from '../enums/schedule-type.enum';
import { IsTime } from '@app/common/decorators';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNumber()
  lessonId!: number;

  @ApiPropertyOptional({ enum: ScheduleType, default: ScheduleType.Lecture })
  @IsOptional()
  @IsEnum({ enum: ScheduleType, default: ScheduleType.Lecture })
  type?: ScheduleType;

  @ApiProperty()
  @IsNumber()
  teacherId!: number;

  @ApiProperty()
  @IsNumber()
  classroomId!: number;

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @IsObject({ each: true })
  groups?: { id: number }[];

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date!: Date;

  @ApiProperty({ example: '10:00' })
  @IsTime()
  startAt!: string;

  @ApiProperty({ example: '11:20' })
  @IsTime()
  endAt!: string;
}
