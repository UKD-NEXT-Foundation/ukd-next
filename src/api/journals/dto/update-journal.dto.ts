import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { CreateJournalDto } from './create-journal.dto';

export class UpdateJournalDto extends PartialType(CreateJournalDto) {
  @ApiProperty()
  @IsUUID('7')
  id!: string;
}
