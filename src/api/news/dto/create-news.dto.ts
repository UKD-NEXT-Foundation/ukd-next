import { ApiProperty } from '@nestjs/swagger';
import { NewsModel } from '@prisma/client';
import { IsString, IsUUID } from 'class-validator';

export class CreateNewsDto implements Omit<NewsModel, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty()
  @IsUUID()
  authorId!: string;
}
