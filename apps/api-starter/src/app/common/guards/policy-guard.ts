import { Reflector } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// Z
import {
  RbacAbility,
  CaslAbilityFactory,
} from '../../casl/casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from '../../casl/policy-types';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler()
      ) || [];

    let request;

    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
    } else if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      request = ctx.getContext().req;
    }

    if (!request) {
      return false;
    }

    const { user } = request;
    const req = request;
    // TODO: potentially pass variables here - req.body.variables
    const ability = this.caslAbilityFactory.createForUser(user);
    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability)
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: RbacAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
