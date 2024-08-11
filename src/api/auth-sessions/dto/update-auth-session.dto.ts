import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthSessionDto } from './create-auth-session.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateAuthSessionDto extends PartialType(CreateAuthSessionDto) {
  @ApiProperty()
  @IsUUID('7')
  id!: string;
}
