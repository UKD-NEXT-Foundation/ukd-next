import { ScheduleType } from '@app/common/enums';
import { LessonEntity } from '@app/api/lessons/entities/lesson.entity';
import { UserEntity } from '@app/api/users/entities/user.entity';
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

  @ApiProperty({ nullable: true })
  @Column({ type: 'date', nullable: true })
  date?: Date | null;

  @ApiProperty({ enum: ScheduleType, default: ScheduleType.Lecture, nullable: true })
  @Column({ enum: ScheduleType, default: ScheduleType.Lecture, nullable: true })
  type?: ScheduleType | null;

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
