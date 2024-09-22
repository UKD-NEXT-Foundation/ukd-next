import { ApiProperty } from '@nestjs/swagger';

export class ResponseKeyDto {
  @ApiProperty({ description: 'Google Client ID' })
  key: string;
}
