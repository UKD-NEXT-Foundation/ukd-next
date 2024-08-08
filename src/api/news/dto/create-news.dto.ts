import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty()
  @IsString()
  сontent!: string;

  @ApiProperty()
  @IsNumber()
  authorId!: number;
}
