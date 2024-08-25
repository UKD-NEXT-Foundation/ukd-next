import { ApiProperty } from '@nestjs/swagger';
import { NewsModel } from '@prisma/client';

export class NewsResponseDto implements NewsModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  authorId: string;
}
