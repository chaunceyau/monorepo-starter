import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RbacAbility, CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from './policy-types';

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

    const { user } = context.switchToHttp().getRequest();
    const req = context.switchToHttp().getRequest();
    // TODO: potentially pass variables here - req.body.variables
    const ability = this.caslAbilityFactory.createForUser(user);
    console.log(req.body.variables);
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
