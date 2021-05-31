import Stripe from 'stripe';
import { subject } from '@casl/ability';
import { UseGuards } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { Resolver, Query, Args } from '@nestjs/graphql';
//
import { DatabaseAction, RbacAbility } from '@monorepo-starter/casl';
//
import { UserConnectionGraphModel, UserGraphModel } from './models/user.model';
import { UserService } from './user.service';
import { AuthenticatedUser } from '../common/decorators/user.decorator';
// import { CreatePaymentInput } from './models/create-payment.input'
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { CheckPolicies } from '../casl/types';
import { PoliciesGuard } from '../common/guards/policy-guard';
import { ConnectionArguments } from '../common/pagination';

@Resolver(_of => UserGraphModel)
export class UserResolver {
  constructor(
    private userService: UserService,
    @InjectStripe() private readonly stripeClient: Stripe
  ) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Query(_returns => UserGraphModel)
  @CheckPolicies((ability: RbacAbility, args: Record<string, any>) =>
    // @ts-ignore
    ability.can(DatabaseAction.Read, subject('User', { id: args.id }))
  )
  async user(@Args('id') id: string) {
    return this.userService.findUniqueById(id);
  }

  @Query(_returns => UserConnectionGraphModel)
  async allUsers(@Args('input') input: ConnectionArguments) {
    return this.userService.findAllConnection(input);
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Query(_returns => UserGraphModel)
  @CheckPolicies((ability: RbacAbility) =>
    ability.can(DatabaseAction.Read, 'User')
  )
  async viewer(@AuthenticatedUser() user) {
    return await this.userService.findUniqueById(user.id);
  }

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
