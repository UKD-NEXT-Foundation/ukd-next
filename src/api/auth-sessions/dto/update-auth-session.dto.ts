import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { CreateAuthSessionDto } from './create-auth-session.dto';

export class UpdateAuthSessionDto extends PartialType(CreateAuthSessionDto) {
  @ApiProperty()
  @IsUUID('7')
  id!: string;
}
