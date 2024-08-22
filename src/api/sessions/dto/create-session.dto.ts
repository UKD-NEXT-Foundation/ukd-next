import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationProvider, SessionModel } from '@prisma/client';
import { IsDateString, IsEnum, IsHash, IsIP, IsOptional, IsString, IsUUID } from 'class-validator';
import { v7 as uuidv7 } from 'uuid';

export class CreateSessionDto implements Omit<SessionModel, 'createdAt' | 'updatedAt'> {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  id: string = uuidv7();

  @ApiProperty()
  @IsUUID('7')
  userId: string;

  @ApiProperty()
  @IsString()
  userAgent: string;

  @ApiProperty()
  @IsIP()
  ipAddress: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(NotificationProvider)
  notificationProvider: NotificationProvider | null = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notificationCredentials: string = null;

  @ApiProperty()
  @IsHash('sha256')
  refreshTokenHash: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  removedAt: Date | null = null;
}
