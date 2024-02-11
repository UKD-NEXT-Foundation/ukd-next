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

@Entity('schedule')
export class ScheduleEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: () => LessonEntity })
  @ManyToOne(() => LessonEntity, (lessson) => lessson.schedules)
  @JoinColumn({ name: 'lesssonId' })
  lessson?: LessonEntity;

  @Column({ select: false })
  lesssonId!: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.schedules)
  @JoinColumn({ name: 'teacherId' })
  teacher?: UserEntity;

  @Column({ select: false })
  teacherId!: number;

  @ApiProperty({ type: () => ClassroomEntity })
  @ManyToOne(() => ClassroomEntity, (classroom) => classroom.schedules)
  @JoinColumn({ name: 'classroomId' })
  classroom?: ClassroomEntity;

  @Column({ select: false })
  classroomId!: number;

  @ApiProperty({ type: () => GroupEntity, isArray: true })
  @ManyToMany(() => GroupEntity, (group) => group.schedules)
  @JoinTable({ name: 'schedules-to-groups' })
  groups?: GroupEntity[];

  @ApiProperty()
  @Column()
  startAt!: Date;

  @ApiProperty()
  @Column()
  endAt!: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
