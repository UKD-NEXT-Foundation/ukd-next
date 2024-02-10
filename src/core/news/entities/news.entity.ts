import { UserEntity } from '@app/core/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column({ type: 'text' })
  сontent!: string;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'authorId' })
  author?: UserEntity;

  @Column({ select: false })
  authorId!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
