import { GroupEntity } from '@app/api/groups/entities/group.entity';
import { LessonEntity } from '@app/api/lessons/entities/lesson.entity';
import { UserEntity } from '@app/api/users/entities/user.entity';
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
  @Column({ unique: true })
  name: string;

  @Column({ select: false, nullable: true })
  headOfDepartmentId?: number | null;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'headOfDepartmentId' })
  headOfDepartment?: UserEntity | null;

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
