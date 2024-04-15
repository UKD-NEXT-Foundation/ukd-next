import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUrl } from 'class-validator';
import { IRequirements } from '../interfaces/classroom-features.interface';

export class CreateClassroomDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isOnline?: boolean;

  @ApiPropertyOptional({ default: null })
  @IsOptional()
  @IsUrl()
  onlineLink?: string | null;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isUseForSchedule?: boolean;

  @ApiProperty()
  @IsNumber()
  numberOfSeats!: number;

  @ApiPropertyOptional({ default: {} })
  @IsOptional()
  @IsObject()
  availableRequirements?: IRequirements;
}
