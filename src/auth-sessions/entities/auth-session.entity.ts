import { UserEntity } from '@src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auth-sessions')
export class AuthSessionEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  refreshToken!: string;

  @Column()
  userId!: number;

  @Column()
  userAgent!: string;

  @Column()
  expiresAt!: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.authSessions)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;
}
