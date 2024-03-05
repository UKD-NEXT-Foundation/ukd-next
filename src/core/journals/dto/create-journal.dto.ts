import { ScheduleType } from '@app/common/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateJournalDto {
  @ApiProperty()
  @IsNumber()
  lessonId!: number;

  @ApiProperty()
  @IsNumber()
  teacherId!: number;

  @ApiPropertyOptional({ enum: ScheduleType, default: ScheduleType.Lecture })
  @IsOptional()
  @IsEnum({ enum: ScheduleType, default: ScheduleType.Lecture })
  type?: ScheduleType;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date!: Date;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  mark!: number;
}
