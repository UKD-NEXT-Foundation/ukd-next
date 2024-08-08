import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateVariableDto {
  @ApiProperty()
  @IsString()
  key!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  value?: string | null;
}
