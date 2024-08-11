import { AuthSessionModel } from '@prisma/client';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAuthSessionDto implements Omit<AuthSessionModel, 'id' | 'createdAt' | 'updatedAt'> {
  @IsString()
  refreshToken!: string;

  @IsUUID()
  userId!: string;

  @IsString()
  userAgent!: string;

  @IsDate()
  expiresIn!: Date;

  @IsOptional()
  @IsDate()
  lastTokenUpdateAt: Date = new Date();
}
