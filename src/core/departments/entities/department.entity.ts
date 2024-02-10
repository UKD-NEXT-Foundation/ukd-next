import { GroupEntity } from '@app/core/groups/entities/group.entity';
import { LessonEntity } from '@app/core/lessons/entities/lesson.entity';
import { UserEntity } from '@app/core/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('departments')
export class DepartmentEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column()
  name: string;

  @Column({ select: false })
  headOfDepartmentId!: number;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'headOfDepartmentId' })
  headOfDepartment?: UserEntity;

  @ApiProperty({ type: () => GroupEntity, isArray: true })
  @OneToMany(() => GroupEntity, (group) => group.department)
  groups?: GroupEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => LessonEntity, (lesson) => lesson.department)
  lessons: LessonEntity[];
}
