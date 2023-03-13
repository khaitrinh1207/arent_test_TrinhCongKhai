import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as _ from 'lodash';
import { User } from '../generates/prisma/models';

export const CurrentUser = createParamDecorator(
  (property: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return property ? _.get(request.user, property) : request.user;
  },
);
