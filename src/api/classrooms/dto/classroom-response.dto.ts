import { ApiProperty } from '@nestjs/swagger';
import { ClassroomModel, Prisma } from '@prisma/client';

export class ClassroomResponseDto implements ClassroomModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ default: '' })
  description: string;

  @ApiProperty({ default: false })
  isOnline: boolean;

  @ApiProperty({ default: true })
  isUseForSchedule: boolean;

  @ApiProperty()
  numberOfSeats: number;

  @ApiProperty({ default: {} })
  availableRequirements: Prisma.JsonValue;

  @ApiProperty({ default: null })
  onlineLink: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
