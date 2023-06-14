import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '~/types/custom';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const rawUser = ctx.getContext().req.user.userinfo;
    const user: User = {
      id: rawUser.sub,
      name: rawUser.name,
      firstName: rawUser.given_name,
      lastName: rawUser.family_name,
      username: rawUser.preferred_username,
    };

    return user;
  },
);
