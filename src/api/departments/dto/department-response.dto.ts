import { ApiProperty } from '@nestjs/swagger';
import { DepartmentModel } from '@prisma/client';

export class DepartmentResponseDto implements DepartmentModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ default: null })
  headOfDepartmentId: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
