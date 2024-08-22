import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { UserModel } from '@prisma/client';

import { IExpressRequest } from '@app/common/interfaces';

export const User = createParamDecorator((data: keyof UserModel, ctx: ExecutionContext) => {
  const req: IExpressRequest = ctx.switchToHttp().getRequest();

  if (!req.user) {
    throw new UnauthorizedException('Not authorized');
  }

  if (data) {
    return req.user[data];
  }

  return req.user;
});
