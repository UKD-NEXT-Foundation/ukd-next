import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from './create-schedule.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  @ApiProperty()
  @IsUUID('7')
  id!: string;
}
