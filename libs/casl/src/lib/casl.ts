import { User } from '@prisma/client';
import { PrismaAbility } from '@casl/prisma';
import { AbilityBuilder, AbilityClass } from '@casl/ability';
//
import { RbacAbility } from './types';
import { PermissionMap } from './permissions';

export function createAbilitiesForUser(
  // TODO: becareful - frontend shouldn't have full user
  user?: Partial<User>,
  loggerFunction?: (message: string) => void
) {
  if (typeof loggerFunction !== 'undefined') {
    loggerFunction(`Creating abilities for user ${user.id}`);
  }
  const RbacAbility = PrismaAbility as AbilityClass<RbacAbility>;
  const { can, build } = new AbilityBuilder<any>(
    RbacAbility as AbilityClass<RbacAbility>
  );

  if (typeof user !== 'undefined') {
    _createAbilitiesForUserRoles({ user, can, loggerFunction });
  }

  return build({
    // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
    // detectSubjectType: (item) => item.__typename,
    // detectSubjectType: (item) => subject('User', item),
    // (item.constructor as unknown) as ExtractSubjectType<PrismaDatabaseModel>,
  });
}

function _createAbilitiesForUserRoles({ user, can, loggerFunction }) {
  for (const role of user.roles) {
    for (const [model, actions, func] of PermissionMap[role]) {
      // for (const action of actions) {
      // broken if not array
      if (typeof loggerFunction !== 'undefined') {
        loggerFunction(`${actions}:${model} added to user ${user.id}`);
      }
      // subject
      if (typeof func === 'undefined') {
        can(actions, model);
      } else {
        can(actions, model, func(user));
      }
    }
  }
}
