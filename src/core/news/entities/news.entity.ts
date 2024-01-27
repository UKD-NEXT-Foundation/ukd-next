import { fakeRandomUuid } from '@common/functions';
import { UserEntity } from '@core/users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('news')
export class NewsEntity {
  @ApiProperty({ example: fakeRandomUuid })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column()
  title!: string;

  @ApiPropertyOptional({ default: '' })
  @Column({ type: 'text', default: '' })
  description?: string;

  @ApiPropertyOptional({ default: '' })
  @Column({ default: '' })
  image?: string;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'authorId' })
  author?: UserEntity;

  @Column({ select: false })
  authorId!: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
