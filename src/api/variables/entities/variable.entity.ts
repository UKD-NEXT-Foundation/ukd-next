import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('variables')
export class VariableEntity {
  @ApiProperty()
  @PrimaryColumn()
  key!: string;

  @ApiProperty({ nullable: true })
  @Column({ type: 'text', nullable: true })
  value?: string | null;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;
}
