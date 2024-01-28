import { Request } from 'express';
import { UserEntity } from '@app/core/users/entities/user.entity';

export interface IExpressRequest extends Request {
  user?: UserEntity | null;
}
