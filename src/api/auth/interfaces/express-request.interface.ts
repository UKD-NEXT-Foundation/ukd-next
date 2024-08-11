import { Request } from 'express';
import { UserModel } from '@prisma/client';

export interface IExpressRequest extends Request {
  user?: UserModel | null;
  sessionId?: string | null;
}
