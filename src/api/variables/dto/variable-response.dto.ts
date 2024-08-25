import { ApiProperty } from '@nestjs/swagger';
import { VariableModel } from '@prisma/client';

export class VariableResponseDto implements VariableModel {
  @ApiProperty()
  key: string;

  @ApiProperty({ default: null })
  value: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
