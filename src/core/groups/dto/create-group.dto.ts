import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  leaderId?: number | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  curatorId?: number | null;

  @ApiPropertyOptional({ default: null })
  @IsOptional()
  @IsString()
  googleSheetsURL?: string | null;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @IsString()
  checksumOfJournalContent?: string;
}
