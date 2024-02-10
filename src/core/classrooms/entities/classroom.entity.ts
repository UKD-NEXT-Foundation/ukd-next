import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ScheduleEntity } from '@app/core/schedules/entities/schedule.entity';
import { IRequirements } from '../interfaces/classroom-features.interface';
import { ApiProperty } from '@nestjs/swagger';

@Entity('сlassroom')
export class ClassroomEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column()
  name!: string;

  @ApiProperty({ default: '' })
  @Column({ default: '' })
  description?: string;

  @ApiProperty()
  @Column({ default: false })
  isOnline?: boolean;

  @ApiProperty()
  @Column({ default: true })
  isUseForSchedule?: boolean;

  @ApiProperty()
  @Column()
  numberOfSeats!: number;

  @ApiProperty({ default: {} })
  @Column({ type: 'json', default: {} })
  availableRequirements?: IRequirements;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.classroom)
  schedules: ScheduleEntity[];
}
