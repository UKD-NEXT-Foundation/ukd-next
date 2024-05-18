import { ClassroomEntity } from '@app/core/classrooms/entities/classroom.entity';
import { GroupEntity } from '@app/core/groups/entities/group.entity';
import { LessonEntity } from '@app/core/lessons/entities/lesson.entity';
import { UserEntity } from '@app/core/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ScheduleType } from '../enums/schedule-type.enum';

@Entity('schedule')
export class ScheduleEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column({ type: 'date' })
  date!: Date;

  @ApiProperty()
  @Column({ type: 'time' })
  startAt!: string;

  @ApiProperty()
  @Column({ type: 'time' })
  endAt!: string;

  @ApiProperty({ enum: ScheduleType, default: ScheduleType.Lecture })
  @Column({ enum: ScheduleType, default: ScheduleType.Lecture, nullable: true })
  type?: ScheduleType | null;

  @ApiProperty({ default: false })
  @Column({ default: false })
  isCanceled?: boolean;

  @ApiProperty({ type: () => LessonEntity })
  @ManyToOne(() => LessonEntity, (lesson) => lesson.schedules)
  @JoinColumn({ name: 'lessonId' })
  lesson?: LessonEntity;

  @Column({ select: false })
  lessonId!: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.schedules, { nullable: true })
  @JoinColumn({ name: 'teacherId' })
  teacher?: UserEntity | null;

  @Column({ select: false, nullable: true })
  teacherId?: number | null;

  @ApiProperty({ type: () => ClassroomEntity })
  @ManyToOne(() => ClassroomEntity, (classroom) => classroom.schedules, { nullable: true })
  @JoinColumn({ name: 'classroomId' })
  classroom?: ClassroomEntity | null;

  @Column({ select: false, nullable: true })
  classroomId?: number | null;

  @ApiProperty({ type: () => GroupEntity, isArray: true })
  @ManyToMany(() => GroupEntity, (group) => group.schedules)
  @JoinTable({ name: 'schedules-to-groups' })
  groups?: GroupEntity[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
