import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { AuthProvider } from '../enums/auth-provider.enum';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsEnum(AuthProvider)
  authProvider!: AuthProvider;

  @IsOptional()
  @IsNumber()
  googleUserId: number;

  @IsOptional()
  @IsEnum(UserRole, { each: true })
  rules?: UserRole[];

  @IsEmail()
  email!: string;

  @IsString()
  fullname!: string;

  @IsOptional()
  @IsUrl()
  pictureURL?: string;
}
