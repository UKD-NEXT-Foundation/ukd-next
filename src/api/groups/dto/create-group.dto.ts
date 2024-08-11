import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GroupModel } from '@prisma/client';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateGroupDto implements Omit<GroupModel, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  leaderId: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  curatorId: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  departmentId: string | null;

  @ApiPropertyOptional({ default: null })
  @IsOptional()
  @IsString()
  googleSheetsURL: string | null;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @IsString()
  checksumOfJournalContent: string;
}
