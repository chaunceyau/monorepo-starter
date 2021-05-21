import { Reflector } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { RbacAbility, createAbilitiesForUser } from '@monorepo-starter/casl';
//
import { CHECK_POLICIES_KEY, PolicyHandler } from '../../casl/types';

@Injectable()
export class PoliciesGuard implements CanActivate {
  private readonly logger = new Logger(PoliciesGuard.name);

  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler()
      ) || [];

    let request;
    let args: Record<string, any>;

    if (context.getType() === 'http') {
      // TODO: fix if allowing normal http reqs
      return false;
      // args =
      // request = context.switchToHttp().getRequest();
    } else if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      request = ctx.getContext().req;
      args = ctx.getArgs();
    }

    this.logger.debug(`Pulling user off of request - id: ${request.user?.id}`);
    // TODO: potentially pass variables here - req.body.variables
    const ability = createAbilitiesForUser(request.user, (message) =>
      this.logger.debug(message)
    );

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, args)
    );
  }

  private execPolicyHandler(
    handler: PolicyHandler,
    ability: RbacAbility,
    args: Record<string, any>
  ) {
    if (typeof handler === 'function') {
      return handler(ability, args);
    }
    return handler.handle(ability, args);
  }
}
