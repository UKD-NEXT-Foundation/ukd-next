import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserModel } from '@prisma/client';

import { IExpressRequest } from '@app/common/interfaces';

export const OptionalUser = createParamDecorator((data: keyof UserModel, ctx: ExecutionContext) => {
  const req: IExpressRequest = ctx.switchToHttp().getRequest();

  if (!req.user) {
    return null;
  }

  if (data) {
    return req.user[data];
  }

  return req.user;
});
