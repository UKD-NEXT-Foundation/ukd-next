import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsNumber, IsObject } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNumber()
  lesssonId!: number;

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
