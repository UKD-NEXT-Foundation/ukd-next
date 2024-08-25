import { ApiProperty } from '@nestjs/swagger';
import { NotificationModel } from '@prisma/client';

export class NotificationResponseDto implements NotificationModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ default: false })
  isSilent: boolean;

  @ApiProperty({ default: null })
  readAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
