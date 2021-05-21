import { SetMetadata } from '@nestjs/common';
import { RbacAbility } from '@monorepo-starter/casl';

interface IPolicyHandler {
  handle(ability: RbacAbility, args: Record<string, any>): boolean;
}

type PolicyHandlerCallback = (
  ability: RbacAbility,
  args: Record<string, any>
) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
