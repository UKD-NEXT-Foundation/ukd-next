import { fakeRandomUuid } from '@common/functions';
import { ClassroomEntity } from '@core/classrooms/entities/classroom.entity';
import { GroupEntity } from '@core/groups/entities/group.entity';
import { LessonEntity } from '@core/lessons/entities/lesson.entity';
import { UserEntity } from '@core/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('schedule')
export class ScheduleEntity {
  @ApiProperty({ example: fakeRandomUuid() })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({ type: () => LessonEntity })
  @ManyToOne(() => LessonEntity, (lessson) => lessson.schedules)
  @JoinColumn({ name: 'lesssonId' })
  lessson?: LessonEntity;

  @Column({ select: false })
  lesssonId!: string;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.schedules)
  @JoinColumn({ name: 'teacherId' })
  teacher?: UserEntity;

  @Column({ select: false })
  teacherId!: string;

  @ApiProperty({ type: () => ClassroomEntity })
  @ManyToOne(() => ClassroomEntity, (classroom) => classroom.schedules)
  @JoinColumn({ name: 'classroomId' })
  classroom?: ClassroomEntity;

  @Column({ select: false })
  classroomId!: string;

  @ApiProperty({ type: () => GroupEntity, isArray: true })
  @ManyToMany(() => GroupEntity, (group) => group.schedules)
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
