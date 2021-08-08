import Stripe from 'stripe';
// import {subject} from '@casl/ability';
import {UseGuards} from '@nestjs/common';
import {InjectStripe} from 'nestjs-stripe';
import {Resolver, Args, Mutation} from '@nestjs/graphql';

import {ImageUploadService} from '@monorepo-starter/api-upload';

import {UserRepository} from '../../data/repos/user.repository';
import {UserGraphModel} from '../../user/models/user.model';
import {AuthenticatedUser} from '../../common/decorators/user.decorator';
import {AuthenticatedGuard} from '../../common/guards/authenticated.guard';
import {CreatePaymentInput} from '../../user/models/create-payment.input';

@Resolver(_of => UserGraphModel)
export class UserMutationResolver {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly uploadService: ImageUploadService,
    @InjectStripe() private readonly stripeClient: Stripe
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(_returns => String)
  async createPaymentMethod(
    @AuthenticatedUser() user,
    @Args('input') input: CreatePaymentInput
  ) {
    // this.stripeClient.paymentMethods.create({});
    return ':)';
  }
}
