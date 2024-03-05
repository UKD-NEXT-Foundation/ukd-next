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

  @ManyToOne(() => LessonEntity, (lesson) => lesson.journals)
  @JoinColumn({ name: 'lessonId' })
  lesson?: LessonEntity;

  @Column({ select: false })
  lessonId!: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.journalsByTeacher)
  @JoinColumn({ name: 'teacherId' })
  teacher?: UserEntity;

  @Column({ select: false })
  teacherId!: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.journalsByStudent)
  @JoinColumn({ name: 'studentId' })
  student?: UserEntity;

  @Column({ select: false })
  studentId!: number;

  @ApiProperty()
  @Column({ type: 'date' })
  date!: Date;

  @ApiProperty({ enum: ScheduleType, default: ScheduleType.Lecture })
  @Column({ enum: ScheduleType, default: ScheduleType.Lecture })
  type?: ScheduleType;

  @ApiProperty()
  @Column({ type: 'varchar', length: 3 })
  mark!: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;
}
