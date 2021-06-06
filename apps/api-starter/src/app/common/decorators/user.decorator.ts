import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, GqlContextType } from '@nestjs/graphql';
import { User } from '@prisma/client';

// note: decorators not enforcing type safety on decorators...
export interface ResponseObjectUser extends User {}

// TODO: convert to prisma enum
enum SubscriptionType {
  FREE_TIER = 'FREE_TIER',
  PREMIUM_SUBSCRIBER = 'PREMIUM_SUBSCRIBER',
  ENTERPRISE_SUBSCRIBER = 'ENTERPRISE_SUBSCRIBER',
}

export const AuthenticatedUser = createParamDecorator<ResponseObjectUser>(
  (data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      const ctx = context.switchToHttp().getRequest();
      return ctx.user;
    } else if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req.user;
    }
  }
);
