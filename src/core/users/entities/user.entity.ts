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

  @ApiProperty({ default: null })
  @Column({ default: null })
  phone?: string | null;

  @ApiProperty({ enum: UserRole, isArray: true, default: [UserRole.Student] })
  @Column({ type: 'enum', enum: UserRole, array: true, default: [UserRole.Student] })
  roles: UserRole[];

  @ApiProperty({ type: 'enum', enum: AuthProvider })
  @Column({ type: 'enum', enum: AuthProvider })
  authProvider!: AuthProvider;

  @ApiProperty({ default: null })
  @Column({ default: null })
  googleUserId?: string | null;

  @ApiProperty()
  @Column({ default: 'en' })
  languageCode?: string;

  @ApiProperty({ default: '' })
  @Column({ default: '' })
  pictureURL?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => AuthSessionEntity, (authSession) => authSession.user)
  authSessions?: AuthSessionEntity[];

  @ApiProperty({ type: GroupEntity, nullable: true })
  @ManyToOne(() => GroupEntity, (group) => group.students)
  group?: GroupEntity | null;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.teacher)
  schedules?: ScheduleEntity[];

  @OneToMany(() => JournalEntity, (journal) => journal.teacher)
  journalsByTeacher?: JournalEntity[];

  @OneToMany(() => JournalEntity, (journal) => journal.student)
  journalsByStudent?: JournalEntity[];
}
