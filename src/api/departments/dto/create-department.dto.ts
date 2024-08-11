import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';
import { DepartmentModel } from '@prisma/client';

export class CreateDepartmentDto implements Omit<DepartmentModel, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  headOfDepartmentId: string | null;
}
