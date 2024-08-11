import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IExpressRequest } from '@app/common/interfaces';
import { UserModel } from '@prisma/client';

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
