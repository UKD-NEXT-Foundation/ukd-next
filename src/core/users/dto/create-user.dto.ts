import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { AuthProvider } from '../enums/auth-provider.enum';
import { UserRole } from '../enums/user-role.enum';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsEmail()
  email!: string;

  @IsString()
  fullname!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ type: 'enum', enum: AuthProvider })
  @IsEnum(AuthProvider)
  authProvider!: AuthProvider;

  @ApiPropertyOptional({ enum: UserRole, isArray: true, default: [UserRole.Student] })
  @IsOptional()
  @IsEnum(UserRole, { each: true })
  roles?: UserRole[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  googleUserId?: string;

  @ApiPropertyOptional({ minLength: 2, maxLength: 2 })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  languageCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  pictureURL?: string;
}
