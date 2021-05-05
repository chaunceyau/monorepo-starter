import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, GqlContextType } from '@nestjs/graphql';

// note: decorators not enforcing type safety on decorators...
export interface ResponseObjectUser {
  id: string;
  email: string;
  subscription_type?: SubscriptionType;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  current_period_end?: string;
}

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
