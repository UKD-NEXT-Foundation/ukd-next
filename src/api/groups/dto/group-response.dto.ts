import { ApiProperty } from '@nestjs/swagger';
import { GroupModel } from '@prisma/client';

export class GroupResponseDto implements GroupModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ default: null })
  leaderId: string | null;

  @ApiProperty({ default: null })
  curatorId: string | null;

  @ApiProperty({ default: null })
  departmentId: string | null;

  @ApiProperty({ default: null })
  googleSheetsURL: string | null;

  @ApiProperty({ default: '' })
  checksumOfJournalContent: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
