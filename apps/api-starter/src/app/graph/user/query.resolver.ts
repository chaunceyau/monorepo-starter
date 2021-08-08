import Stripe from 'stripe';
// import {subject} from '@casl/ability';
import {UseGuards} from '@nestjs/common';
import {InjectStripe} from 'nestjs-stripe';
import {Resolver, Query, Context, Args} from '@nestjs/graphql';

import {ImageUploadService} from '@monorepo-starter/api-upload';
import {RbacAbility} from '@monorepo-starter/casl';

import {UserRepository} from '../../data/repos/user.repository';
import {
  UserConnectionGraphModel,
  UserGraphModel,
} from '../../user/models/user.model';
import {JwtAuthGuard} from '../../common/guards/jwt.guard';
import {PoliciesGuard} from '../../common/guards/policy-guard';
import {AuthenticatedUser} from '../../common/decorators/user.decorator';
import {CheckPolicies} from '../../casl/types';
import {ConnectionArguments} from '../../common/pagination';

interface RequestContext {
  dataSources: any;
}

@Resolver(_of => UserGraphModel)
export class UserQueryResolver {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly uploadService: ImageUploadService,
    @InjectStripe() private readonly stripeClient: Stripe
  ) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Query(_returns => UserGraphModel, {name: 'viewer'})
  async getCurrentViewer(
    @AuthenticatedUser() user,
    @Context() {dataSources}: RequestContext
  ) {
    return await dataSources.userRepo.findUniqueById(user.id);
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Query(_returns => UserGraphModel, {name: 'userById'})
  @CheckPolicies((ability: RbacAbility, args: Record<string, any>) =>
    // @ts-ignore
    ability.can(DatabaseAction.Read, subject('User', {id: args.id}))
  )
  async getUserById(@Args('id') id: string) {
    return this.userRepo.findUniqueById(id);
  }

  @Query(_returns => UserConnectionGraphModel, {name: 'users'})
  async getUsersConnection(
    @Args('input', {nullable: true, defaultValue: {first: 5}})
    input?: ConnectionArguments
  ) {
    return this.userRepo.findAllConnection(input);
  }
}
