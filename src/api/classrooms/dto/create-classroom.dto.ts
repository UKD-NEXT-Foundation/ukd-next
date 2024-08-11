import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClassroomModel, Prisma } from '@prisma/client';
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUrl } from 'class-validator';

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
