import { ScheduleType } from '@app/common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { JournalModel } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class FindAllJournalDto implements Omit<JournalModel, 'id' | 'mark' | 'createdAt' | 'updatedAt'> {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  lessonId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  teacherId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  studentId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ScheduleType)
  @IsDate()
  type: ScheduleType;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  onlyIds?: boolean = false;
}
