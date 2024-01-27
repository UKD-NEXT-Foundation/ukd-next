import { fakeRandomUuid } from '@common/functions';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ example: fakeRandomUuid() })
  @IsUUID()
  headOfDepartmentId: string;
}
