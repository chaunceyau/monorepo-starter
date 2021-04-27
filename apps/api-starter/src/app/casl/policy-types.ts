import { SetMetadata } from '@nestjs/common';
import { RbacAbility } from './casl-ability.factory';

interface IPolicyHandler {
  handle(ability: RbacAbility): boolean;
}

type PolicyHandlerCallback = (ability: RbacAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
