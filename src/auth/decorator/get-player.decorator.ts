import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Account } from '../account.entity';

export const GetPlayer = createParamDecorator(
  (_data, ctx: ExecutionContext): Account => {
    const req = ctx.switchToHttp().getRequest();
    return req.user.player;
  },
);
