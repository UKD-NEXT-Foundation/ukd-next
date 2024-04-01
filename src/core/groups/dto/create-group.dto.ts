import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  elderId?: number | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  curatorId?: number | null;
}
