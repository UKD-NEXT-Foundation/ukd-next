import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VariableModel } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class CreateVariableDto implements Omit<VariableModel, 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsString()
  key!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  value: string | null;
}
