import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

import { CreateNotificationDto } from './create-notification.dto';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @ApiProperty()
  @IsUUID('7')
  id: string;

  @ApiPropertyOptional({ default: null })
  @IsOptional()
  @IsDateString()
  readAt: Date | null = null;
}
