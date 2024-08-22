import { ApiProperty } from '@nestjs/swagger';
import { NotificationProvider } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SubscribeNotificationDto {
  @ApiProperty({ default: NotificationProvider.WEB_PUSH })
  @IsEnum(NotificationProvider)
  notificationProvider: NotificationProvider;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  notificationCredentials: string;
}
