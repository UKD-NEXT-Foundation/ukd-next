import { IsDate, IsJWT, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAuthSessionDto {
  @IsJWT()
  refreshToken!: string;

  @IsNumber()
  userId!: number;

  @IsString()
  userAgent!: string;

  @IsDate()
  expiresIn!: Date;

  @IsOptional()
  @IsDate()
  lastTokenUpdateAt?: Date;
}
