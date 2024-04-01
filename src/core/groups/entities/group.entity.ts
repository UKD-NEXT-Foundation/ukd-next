import { DepartmentEntity } from '@app/core/departments/entities/department.entity';
import { LessonEntity } from '@app/core/lessons/entities/lesson.entity';
import { ScheduleEntity } from '@app/core/schedules/entities/schedule.entity';
import { UserEntity } from '@app/core/users/entities/user.entity';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'elderId' })
  elder?: UserEntity | null;

  @Column({ nullable: true })
  elderId: number | null;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'curatorId' })
  curator?: UserEntity | null;

  @Column({ nullable: true })
  curatorId: number | null;

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
