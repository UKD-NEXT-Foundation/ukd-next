import { fakeRandomUuid } from '@common/functions';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ example: fakeRandomUuid() })
  @IsUUID()
  elderId: string;

  @ApiProperty({ example: fakeRandomUuid() })
  @IsUUID()
  curatorId: string;

  //   @ApiProperty({ example: fakeRandomUuid(), isArray: true })
  //   @IsUUID('4', { each: true })
  //   students: string[];
}
