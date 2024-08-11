import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { IExpressRequest } from '@app/common/interfaces';
import { UserModel } from '@prisma/client';

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
