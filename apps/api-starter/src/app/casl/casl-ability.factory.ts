import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { UserGraphModel } from '../user/models/user.model';
import { Action } from './policy-types';

type Subjects = InferSubjects<typeof UserGraphModel> | 'all';
// type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

export type RbacAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user?: UserGraphModel) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<RbacAbility>);
    console.log('CaslAbilityFactory');

    if (user) {
      can(Action.Read, UserGraphModel);
    } 

    // can(Action.Update, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
