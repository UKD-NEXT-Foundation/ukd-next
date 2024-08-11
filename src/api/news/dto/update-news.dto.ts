import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @ApiProperty()
  @IsUUID('7')
  id!: string;
}
