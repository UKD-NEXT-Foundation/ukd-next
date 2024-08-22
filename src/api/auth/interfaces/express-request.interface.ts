import { UserModel } from '@prisma/client';
import { Request } from 'express';

export interface IExpressRequest extends Request {
  user?: UserModel | null;
  sessionId?: string | null;
}
