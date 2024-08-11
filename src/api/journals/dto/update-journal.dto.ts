import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateJournalDto } from './create-journal.dto';
import { IsUUID } from 'class-validator';

export class UpdateJournalDto extends PartialType(CreateJournalDto) {
  @ApiProperty()
  @IsUUID('7')
  id!: string;
}
