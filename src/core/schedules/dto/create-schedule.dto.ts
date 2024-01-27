import { fakeRandomUuid } from '@common/functions';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({ example: fakeRandomUuid() })
  @IsUUID()
  lesssonId!: string;

  @ApiProperty({ example: fakeRandomUuid() })
  @IsUUID()
  teacherId!: string;

  @ApiProperty({ example: fakeRandomUuid() })
  @IsUUID()
  classroomId!: string;

  @ApiPropertyOptional({ example: fakeRandomUuid(), isArray: true })
  @IsOptional()
  @IsUUID('4', { each: true })
  groupIds?: string[];

  @ApiProperty()
  @IsDate()
  startAt!: Date;

  @ApiProperty()
  @IsDate()
  endAt!: Date;
}
