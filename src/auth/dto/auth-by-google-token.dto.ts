import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthByGoogleTokenDto {
  @ApiProperty({ description: 'Enter access_token from Google OAuth Provider' })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
