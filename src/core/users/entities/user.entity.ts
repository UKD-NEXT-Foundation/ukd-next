import { AuthSessionEntity } from '@core/auth-sessions/entities/auth-session.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AuthProvider } from '../enums/auth-provider.enum';
import { UserRole } from '../enums/user-role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'enum', enum: AuthProvider })
  authProvider!: AuthProvider;

  @Column({ type: 'enum', enum: UserRole, array: true, default: [UserRole.User] })
  roles?: UserRole[];

  @Column({ unique: true })
  email!: string;

  @Column()
  fullname!: string;

  @Column({ default: '' })
  pictureURL?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => AuthSessionEntity, (authSession) => authSession.user)
  authSessions?: AuthSessionEntity[];
}
