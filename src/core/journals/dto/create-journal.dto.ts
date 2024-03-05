import { ScheduleType } from '@app/common/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateJournalDto {
  @ApiProperty()
  @IsNumber()
  lessonId!: number;

  @ApiProperty()
  @IsNumber()
  teacherId!: number;

  @ApiProperty()
  @IsNumber()
  studentId!: number;

  @ApiPropertyOptional({ enum: ScheduleType, default: ScheduleType.Lecture })
  @IsOptional()
  @IsEnum(ScheduleType)
  type?: ScheduleType;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date!: Date;

  @ApiProperty({ example: '4' })
  @IsString()
  @Transform(({ value }) => value.trim().toUpperCase())
  @MinLength(1)
  @MaxLength(3)
  mark!: string;
}
