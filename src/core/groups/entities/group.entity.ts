import { fakeRandomUuid } from '@common/functions';
import { DepartmentEntity } from '@core/departments/entities/department.entity';
import { LessonEntity } from '@core/lessons/entities/lesson.entity';
import { ScheduleEntity } from '@core/schedules/entities/schedule.entity';
import { UserEntity } from '@core/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('groups')
export class GroupEntity {
  @ApiProperty({ example: fakeRandomUuid() })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'elderId' })
  elder?: UserEntity;

  @Column('uuid')
  elderId: string;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'curatorId' })
  curator?: UserEntity;

  @Column('uuid')
  curatorId: string;

  @ApiProperty({ type: () => UserEntity, isArray: true })
  @OneToMany(() => UserEntity, (user) => user.group)
  students: UserEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => DepartmentEntity, (department) => department.groups)
  department: DepartmentEntity;

  @ManyToMany(() => LessonEntity, (lesson) => lesson.groups)
  lessons: LessonEntity[];

  @ManyToMany(() => ScheduleEntity, (schedule) => schedule.groups)
  schedules: ScheduleEntity[];
}
