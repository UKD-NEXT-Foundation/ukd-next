import { ApiProperty } from '@nestjs/swagger';
import { NotificationProvider, SessionModel } from '@prisma/client';

export class SessionResponseDto implements SessionModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  userAgent: string;

  @ApiProperty()
  ipAddress: string;

  @ApiProperty({ default: null, enum: NotificationProvider })
  notificationProvider: NotificationProvider | null;

  @ApiProperty({ default: null })
  notificationCredentials: string | null;

  @ApiProperty({ maxLength: 64 })
  refreshTokenHash: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ default: null })
  removedAt: Date | null;
}
