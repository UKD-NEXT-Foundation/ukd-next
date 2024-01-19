import { IsJWT, IsNumber, IsString } from 'class-validator';

export class CreateAuthSessionDto {
  @IsJWT()
  refreshToken!: string;

  @IsNumber()
  userId!: number;

  @IsString()
  userAgent!: string;
}
