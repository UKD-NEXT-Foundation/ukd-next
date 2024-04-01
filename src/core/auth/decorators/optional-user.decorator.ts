import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { IExpressRequest } from '@app/common/interfaces';
import { UserEntity } from '@app/core/users/entities/user.entity';

export const OptionalUser = createParamDecorator((data: keyof UserEntity, ctx: ExecutionContext) => {
  const req: IExpressRequest = ctx.switchToHttp().getRequest();

  if (!req.user) {
    return null;
  }

  if (data) {
    return req.user[data];
  }

  return req.user;
});
