import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUrl } from 'class-validator';
import { ClassroomModel, Prisma } from '@prisma/client';

export class CreateClassroomDto implements Omit<ClassroomModel, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @IsString()
  description: string = '';

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isOnline: boolean = false;

  @ApiPropertyOptional({ default: null })
  @IsOptional()
  @IsUrl()
  onlineLink: string | null = null;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isUseForSchedule: boolean = true;

  @ApiProperty()
  @IsNumber()
  numberOfSeats!: number;

  @ApiPropertyOptional({ default: {} })
  @IsOptional()
  @IsObject()
  availableRequirements: Prisma.JsonValue = {};
}
