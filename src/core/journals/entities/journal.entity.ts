import { ScheduleType } from '@app/common/enums';
import { LessonEntity } from '@app/core/lessons/entities/lesson.entity';
import { UserEntity } from '@app/core/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('journals')
export class JournalEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => LessonEntity, (lesson) => lesson.schedules)
  @JoinColumn({ name: 'lessonId' })
  lesson?: LessonEntity;

  @Column({ select: false })
  lessonId!: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.schedules, {})
  @JoinColumn({ name: 'teacherId' })
  teacher?: UserEntity;

  @Column({ select: false })
  teacherId!: number;

  @ApiProperty({ enum: ScheduleType, default: ScheduleType.Lecture })
  @Column({ enum: ScheduleType, default: ScheduleType.Lecture })
  type?: ScheduleType;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0.0 })
  mark!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
