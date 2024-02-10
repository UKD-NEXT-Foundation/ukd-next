import { IRequirements } from '@app/core/classrooms/interfaces/classroom-features.interface';
import { DepartmentEntity } from '@app/core/departments/entities/department.entity';
import { GroupEntity } from '@app/core/groups/entities/group.entity';
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

@Entity('lesson')
export class LessonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column()
  name!: string;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'teacherId' })
  teacher?: UserEntity;

  @Column({ select: false })
  teacherId!: number;

  @ApiProperty({ type: () => DepartmentEntity })
  @ManyToOne(() => DepartmentEntity, (department) => department.lessons)
  @JoinColumn({ name: 'departmentId' })
  department?: DepartmentEntity;

  @Column({ select: false })
  departmentId!: number;

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

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.lessson)
  schedules?: ScheduleEntity[];
}
