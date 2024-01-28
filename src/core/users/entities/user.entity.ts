import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthSessionEntity } from '@app/core/auth-sessions/entities/auth-session.entity';
import { AuthProvider } from '../enums/auth-provider.enum';
import { UserRole } from '../enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { GroupEntity } from '@app/core/groups/entities/group.entity';
import { ScheduleEntity } from '@app/core/schedules/entities/schedule.entity';

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  fullname!: string;

  @Column({ type: 'enum', enum: UserRole, array: true, default: [UserRole.Student] })
  roles?: UserRole[];

  @Column({ type: 'enum', enum: AuthProvider })
  authProvider!: AuthProvider;

  @Column({ default: '' })
  pictureURL?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => AuthSessionEntity, (authSession) => authSession.user)
  authSessions?: AuthSessionEntity[];

  @ManyToOne(() => GroupEntity, (group) => group.students)
  group?: GroupEntity;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.teacher)
  schedules?: ScheduleEntity[];
}
