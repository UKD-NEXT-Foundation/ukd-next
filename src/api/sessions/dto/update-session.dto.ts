import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

import { CreateSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  @ApiProperty()
  @IsUUID('7')
  id!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
