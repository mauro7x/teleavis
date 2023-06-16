import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context);
    const rawUser = ctx.getContext().req.user.userinfo;
    const user: User = {
      id: rawUser.sub,
      firstName: rawUser.given_name,
      lastName: rawUser.family_name,
      name: rawUser.name,
      username: rawUser.preferred_username,
      email: rawUser.email,
    };

    return user;
  },
);
