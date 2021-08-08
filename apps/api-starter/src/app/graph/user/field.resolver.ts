import Stripe from 'stripe';
// import {subject} from '@casl/ability';
import {InjectStripe} from 'nestjs-stripe';
import {Resolver, ResolveField} from '@nestjs/graphql';

import {ImageUploadService} from '@monorepo-starter/api-upload';

import {UserRepository} from '../../data/repos/user.repository';
import {
  UserAvatarGraphModel,
  UserGraphModel,
} from '../../user/models/user.model';
import {
  AuthenticatedUser,
  AuthenticatedUserContext,
} from '../../common/decorators/user.decorator';
import {SubscriptionGraphModel} from '../../subscription/models/subscription.model';

@Resolver(_of => UserGraphModel)
export class UserFieldResolver {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly uploadService: ImageUploadService,
    @InjectStripe() private readonly stripeClient: Stripe
  ) {}

  @ResolveField(_type => UserAvatarGraphModel, {
    name: 'avatar',
    nullable: true,
  })
  async getViewerAvatar(@AuthenticatedUser() user: AuthenticatedUserContext) {
    const res = await this.userRepo.findViewerAvatar(user.id);

    if (!res) {
      return null;
    }

    const signedImageObj = this.uploadService.getSignedImageAccessUrl(
      res.remoteFileKey
    );

    return {
      url: signedImageObj.url,
      fileName: res.fileName,
    };
  }

  @ResolveField(_type => SubscriptionGraphModel, {nullable: true})
  async subscription() {
    const stripeResponse = {
      id: 'string',
      planTitle: 'planTitlee',
      planAmount: 250000,
      billingFrequency: 'monthly',
      upcomingAmountDue: 500000,
      upcomingDueDate: 102340023,
    };
    return stripeResponse;
  }
}
