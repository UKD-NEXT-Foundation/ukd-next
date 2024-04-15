import { IRequirements } from '@app/core/classrooms/interfaces/classroom-features.interface';
import { DepartmentEntity } from '@app/core/departments/entities/department.entity';
import { GroupEntity } from '@app/core/groups/entities/group.entity';
import { JournalEntity } from '@app/core/journals/entities/journal.entity';
import { ScheduleEntity } from '@app/core/schedules/entities/schedule.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lesson')
export class LessonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column({ unique: true })
  name!: string;

  // @ApiProperty({ type: () => UserEntity })
  // @OneToOne(() => UserEntity)
  // @JoinColumn({ name: 'defaultTeacherId' })
  // defaultTeacher?: UserEntity | null;

  // @Column({ select: false })
  // defaultTeacherId?: number | null;

  @ApiProperty({ type: () => DepartmentEntity })
  @ManyToOne(() => DepartmentEntity, (department) => department.lessons, { nullable: true })
  @JoinColumn({ name: 'departmentId' })
  department?: DepartmentEntity | null;

  @Column({ select: false, nullable: true })
  departmentId?: number | null;

  @ApiProperty({ type: () => GroupEntity, isArray: true })
  @ManyToMany(() => GroupEntity, (group) => group.lessons)
  groups?: GroupEntity[];

  @ApiProperty()
  @Column({ type: 'json', default: {} })
  classroomRequirements?: IRequirements;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.lesson)
  schedules?: ScheduleEntity[];

  @OneToMany(() => JournalEntity, (journal) => journal.lesson)
  journals?: JournalEntity[];
}
