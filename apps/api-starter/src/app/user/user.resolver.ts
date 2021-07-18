import Stripe from 'stripe';
import {subject} from '@casl/ability';
import {UseGuards} from '@nestjs/common';
import {InjectStripe} from 'nestjs-stripe';
import {Resolver, Query, Args, ResolveField} from '@nestjs/graphql';
//
import {ImageUploadService} from '@monorepo-starter/api-upload';
import {DatabaseAction, RbacAbility} from '@monorepo-starter/casl';
//
// import {CreatePaymentInput} from './models/create-payment.input'
import {UserService} from './user.service';
import {CheckPolicies} from '../casl/types';
import {JwtAuthGuard} from '../common/guards/jwt.guard';
import {ConnectionArguments} from '../common/pagination';
import {PoliciesGuard} from '../common/guards/policy-guard';
import {
  AuthenticatedUser,
  AuthenticatedUserContext,
} from '../common/decorators/user.decorator';
import {
  UserConnectionGraphModel,
  UserGraphModel,
  UserAvatarGraphModel,
} from './models/user.model';
import {SubscriptionGraphModel} from '../subscription/models/subscription.model';

// @Resolver(_of => UserGraphModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly uploadService: ImageUploadService,
    @InjectStripe() private readonly stripeClient: Stripe
  ) {}

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @Query(_returns => UserGraphModel, {name: 'viewer'})
  // // @CheckPolicies((ability: RbacAbility) =>
  // //   ability.can(DatabaseAction.Read, 'User')
  // // )
  // async getCurrentViewer(@AuthenticatedUser() user) {
  //   return await this.userService.findUniqueById(user.id);
  // }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @Query(_returns => UserGraphModel, {name: 'userById'})
  // @CheckPolicies((ability: RbacAbility, args: Record<string, any>) =>
  //   // @ts-ignore
  //   ability.can(DatabaseAction.Read, subject('User', {id: args.id}))
  // )
  // async getUserById(@Args('id') id: string) {
  //   return this.userService.findUniqueById(id);
  // }

  // @Query(_returns => UserConnectionGraphModel, {name: 'users'})
  // async getUsersConnection(
  //   @Args('input', {nullable: true, defaultValue: {first: 5}})
  //   input?: ConnectionArguments
  // ) {
  //   return this.userService.findAllConnection(input);
  // }

  // @ResolveField(_type => UserAvatarGraphModel, {
  //   name: 'avatar',
  //   nullable: true,
  // })
  // async getViewerAvatar(@AuthenticatedUser() user: AuthenticatedUserContext) {
  //   const res = await this.userService.findViewerAvatar(user.id);

  //   if (!res) {
  //     return null;
  //   }

  //   const signedImageObj = this.uploadService.getSignedImageAccessUrl(
  //     res.remoteFileKey
  //   );

  //   return {
  //     url: signedImageObj.url,
  //     fileName: res.fileName,
  //   };
  // }

  // @ResolveField(_type => SubscriptionGraphModel, {nullable: true})
  // async subscription() {
  //   const stripeResponse = {
  //     id: 'string',
  //     planTitle: 'planTitlee',
  //     planAmount: 250000,
  //     billingFrequency: 'monthly',
  //     upcomingAmountDue: 500000,
  //     upcomingDueDate: 102340023,
  //   };
  //   return stripeResponse;
  // }

  // @Mutation(_returns => String)
  // @UseGuards(AuthenticatedGuard)
  // async createPaymentMethod(
  //   @AuthenticatedUser() user,
  //   @Args('input') input: CreatePaymentInput
  // ) {

  //   this.stripeClient.paymentMethods.create({

  //   })
  //   return ':)'
  // }
}
