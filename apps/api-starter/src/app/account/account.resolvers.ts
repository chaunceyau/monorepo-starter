import {subject} from '@casl/ability';
import {UseGuards} from '@nestjs/common';
import {Resolver, Mutation, Args} from '@nestjs/graphql';
import {DatabaseAction, RbacAbility} from '@monorepo-starter/casl';
//
import {
  ChangePasswordResult,
  UpdateAvatarInput,
  UpdatePasswordInput,
} from './models/update-password.input';
import {
  AuthenticatedUser,
  AuthenticatedUserContext,
} from '../common/decorators/user.decorator';
import {AccountService} from './account.service';
import {CheckPolicies} from '../casl/types';
import {JwtAuthGuard} from '../common/guards/jwt.guard';
import {PoliciesGuard} from '../common/guards/policy-guard';

@Resolver('account')
export class AccountResolver {
  constructor(private accountService: AccountService) {}

  @Mutation(_returns => String)
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies((ability: RbacAbility, args: Record<string, any>) =>
  //   // @ts-ignore
  //   ability.can(DatabaseAction.Manage, subject('User', {id: args.id}))
  // )
  async removeViewerAvatar(
    @AuthenticatedUser() user: AuthenticatedUserContext
  ) {
    return this.accountService.removeAvatar(user.id);
  }

  @Mutation(_returns => String)
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies((ability: RbacAbility, args: Record<string, any>) =>
  //   // @ts-ignore
  //   ability.can(DatabaseAction.Manage, subject('User', {id: args.id}))
  // )
  async updateAvatar(
    @Args('input') input: UpdateAvatarInput,
    @AuthenticatedUser() user: AuthenticatedUserContext
  ) {
    return this.accountService.updateAvatar(
      user.id,
      input.remoteFileId,
      input.fileName,
      input.fileType
    );
  }

  @Mutation(_returns => ChangePasswordResult)
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: RbacAbility, args: Record<string, any>) =>
    // @ts-ignore
    ability.can(DatabaseAction.Manage, subject('User', {id: args.id}))
  )
  async changePassword(
    @Args('input') input: UpdatePasswordInput,
    @AuthenticatedUser() user: AuthenticatedUserContext
  ) {
    return this.accountService.changePassword(
      user.id,
      input.oldPassword,
      input.newPassword
    );
  }
}
