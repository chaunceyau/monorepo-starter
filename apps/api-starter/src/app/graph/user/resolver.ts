import Stripe from 'stripe';
// import {subject} from '@casl/ability';
import {UseGuards} from '@nestjs/common';
import {InjectStripe} from 'nestjs-stripe';
import {Resolver, Query, Context, ResolveField} from '@nestjs/graphql';

import {ImageUploadService} from '@monorepo-starter/api-upload';

import {UserRepository} from '../../data/repos/user.repository';
import {
  UserAvatarGraphModel,
  UserGraphModel,
} from '../../user/models/user.model';
import {JwtAuthGuard} from '../../common/guards/jwt.guard';
import {PoliciesGuard} from '../../common/guards/policy-guard';
import {
  AuthenticatedUser,
  AuthenticatedUserContext,
} from '../../common/decorators/user.decorator';

interface RequestContext {
  dataSources: any;
}

@Resolver(_of => UserGraphModel)
export class UserGraphResolver {
  constructor(
    // private readonly userRepo: UserRepository,
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

  @ResolveField(_type => UserAvatarGraphModel, {
    name: 'avatar',
    nullable: true,
  })
  async getViewerAvatar(@AuthenticatedUser() user: AuthenticatedUserContext) {
    //   const res = await this.userService.findViewerAvatar(user.id);

    //   if (!res) {
    //     return null;
    //   }

    //   const signedImageObj = this.uploadService.getSignedImageAccessUrl(
    //     res.remoteFileKey
    //   );

    return {
      url: 'signedImageObj.url',
      fileName: 'res.fileName',
    };
  }
}
