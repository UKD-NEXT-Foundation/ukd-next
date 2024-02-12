import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsNumber, IsObject, IsEnum } from 'class-validator';
import { ScheduleType } from '../enums/schedule-type.enum';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNumber()
  lesssonId!: number;

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
  startAt!: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  endAt!: Date;
}
