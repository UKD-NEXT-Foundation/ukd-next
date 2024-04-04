import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { AuthProvider } from '../enums/auth-provider.enum';
import { UserRole } from '../enums/user-role.enum';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

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

  @ApiPropertyOptional({ enum: UserRole, isArray: true, default: [UserRole.Student] })
  @IsOptional()
  @IsEnum(UserRole, { each: true })
  rules?: UserRole[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  googleUserId?: string;
}
