import Stripe from 'stripe';
import { UseGuards } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { Resolver, Query, Args } from '@nestjs/graphql';
//
import { User } from './models/user.model';
import { UserService } from './user.service';
import { GraphQLUser } from '../common/decorators/user.decorator';
// import { CreatePaymentInput } from './models/create-payment.input'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { JwtAuthGuard } from '../common/guards/jwt.guard';

@Resolver((_of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    @InjectStripe() private readonly stripeClient: Stripe
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Query((_returns) => User)
  async user(@Args('id') id: string) {
    return this.userService.findUniqueById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query((_returns) => User)
  async viewer(@GraphQLUser() user) {
    const viewer = await this.userService.findUniqueById(user.id);
    return viewer;
  }

  // @Mutation(_returns => String)
  // @UseGuards(AuthenticatedGuard)
  // async createPaymentMethod(
  //   @GraphQLUser() user,
  //   @Args('input') input: CreatePaymentInput
  // ) {

  //   this.stripeClient.paymentMethods.create({

  //   })
  //   return ':)'
  // }
}
