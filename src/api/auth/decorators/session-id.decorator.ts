import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';

import { IExpressRequest } from '@app/common/interfaces';

export const SessionId = createParamDecorator((_: any, ctx: ExecutionContext) => {
  const req: IExpressRequest = ctx.switchToHttp().getRequest();

  if (!req.sessionId) {
    throw new UnauthorizedException('Not authorized');
  }

  return req.sessionId;
});
