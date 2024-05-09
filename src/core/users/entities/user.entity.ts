import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
import { JournalEntity } from '@app/core/journals/entities/journal.entity';

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column({ unique: true })
  email!: string;

  @ApiProperty()
  @Column()
  fullname!: string;

  @ApiProperty({ default: null, nullable: true })
  @Column({ default: null, nullable: true })
  phone?: string | null;

  @ApiProperty({ enum: UserRole, isArray: true, default: [UserRole.Student] })
  @Column({ type: 'enum', enum: UserRole, array: true, default: [UserRole.Student] })
  roles: UserRole[];

  @ApiProperty({ type: 'enum', enum: AuthProvider })
  @Column({ type: 'enum', enum: AuthProvider })
  authProvider!: AuthProvider;

  @ApiProperty({ default: null, nullable: true })
  @Column({ default: null, nullable: true })
  googleUserId?: string | null;

  @ApiProperty({ default: 'en', nullable: true })
  @Column({ default: 'en', nullable: true })
  languageCode?: string | null;

  @ApiProperty({ default: null, nullable: true })
  @Column({ default: null, nullable: true })
  pictureURL?: string | null;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => AuthSessionEntity, (authSession) => authSession.user)
  authSessions?: AuthSessionEntity[];

  @ApiProperty({ type: GroupEntity, nullable: true })
  @ManyToOne(() => GroupEntity, (group) => group.students, { nullable: true })
  @JoinColumn({ name: 'groupId' })
  group?: GroupEntity | null;

  @Column({ select: false, nullable: true })
  groupId?: number | null;

  @OneToMany(() => GroupEntity, (group) => group.curator)
  groupsByCurator?: GroupEntity[];

  @OneToMany(() => GroupEntity, (group) => group.leader)
  groupsByLeader?: GroupEntity[];

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.teacher)
  schedules?: ScheduleEntity[];

  @OneToMany(() => JournalEntity, (journal) => journal.teacher)
  journalsByTeacher?: JournalEntity[];

  @OneToMany(() => JournalEntity, (journal) => journal.student)
  journalsByStudent?: JournalEntity[];
}
