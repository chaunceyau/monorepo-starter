import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
//
import { Action } from './policy-types';
import { PermissionMap } from './permissions';

type Subjects = InferSubjects<User> | 'all' | 'User';

export type RbacAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<RbacAbility>);

    const userRoels = ['ADMIN'];
    for (const roel of userRoels) {
      for (const [model, actions] of PermissionMap[roel]) {
        for (const action of actions) {
          can(action, model);
        }
      }
    }

    // can(Action.Update, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) => {
        console.log({ item });
        return (item.constructor as unknown) as ExtractSubjectType<Subjects>;
      },
    });
  }
}
