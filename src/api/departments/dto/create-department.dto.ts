import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DepartmentModel } from '@prisma/client';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDepartmentDto implements Omit<DepartmentModel, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  headOfDepartmentId: string | null;
}
