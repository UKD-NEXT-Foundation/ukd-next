import { ApiProperty } from '@nestjs/swagger';
import { AuthProvider, Role, UserModel } from '@prisma/client';

export class UserResponseDto implements UserModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty({ default: null })
  phone: string | null;

  @ApiProperty({ enum: Role, default: [Role.STUDENT], isArray: true })
  roles: Role[];

  @ApiProperty({ enum: AuthProvider })
  authProvider: AuthProvider;

  @ApiProperty({ default: null })
  googleUserId: string | null;

  @ApiProperty({ default: 'en' })
  languageCode: string | null;

  @ApiProperty({ default: null })
  pictureURL: string | null;

  @ApiProperty({ default: null })
  groupId: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
