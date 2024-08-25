import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationModel } from '@prisma/client';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNotificationDto implements Omit<NotificationModel, 'id' | 'readAt' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsUUID('7')
  userId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isSilent: boolean = false;
}
