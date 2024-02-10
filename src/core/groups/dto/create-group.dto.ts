import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  elderId: number;

  @ApiProperty()
  @IsNumber()
  curatorId: number;

  //   @ApiProperty({ example: fakeRandomUuid(), isArray: true })
  //   @IsUUID('4', { each: true })
  //   students: string[];
}
