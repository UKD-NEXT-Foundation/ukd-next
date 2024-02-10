import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsNumber } from 'class-validator';

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
  @IsNumber({}, { each: true })
  groupIds?: number[];

  @ApiProperty()
  @IsDate()
  startAt!: Date;

  @ApiProperty()
  @IsDate()
  endAt!: Date;
}
