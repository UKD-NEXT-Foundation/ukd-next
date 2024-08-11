import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

import { AuthProvider } from '../enums/auth-provider.enum';
import { UserRole } from '../enums/user-role.enum';

export class FindAllUsersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullname?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({ type: 'enum', enum: AuthProvider })
  @IsOptional()
  @IsEnum(AuthProvider)
  authProvider?: AuthProvider;

  @ApiPropertyOptional({ enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  googleUserId?: string;
}
