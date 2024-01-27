import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  authorId!: string;
}
