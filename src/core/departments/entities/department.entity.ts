import { fakeRandomUuid } from '@common/functions';
import { GroupEntity } from '@core/groups/entities/group.entity';
import { LessonEntity } from '@core/lessons/entities/lesson.entity';
import { UserEntity } from '@core/users/entities/user.entity';
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
  @ApiProperty({ example: fakeRandomUuid() })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column()
  name: string;

  @Column({ select: false })
  headOfDepartmentId!: string;

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
