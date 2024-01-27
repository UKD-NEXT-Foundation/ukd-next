import { fakeRandomUuid } from '@common/functions';
import { IRequirements } from '@core/classrooms/interfaces/classroom-features.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ example: fakeRandomUuid() })
  @IsUUID()
  teacherId!: string;

  @ApiProperty({ example: fakeRandomUuid() })
  @IsUUID()
  departmentId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  classroomRequirements?: IRequirements;
}
