import { Controller, Response, Get, UseGuards } from '@nestjs/common';
//
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionService } from './subscription.service';
import { AuthenticatedUser } from '../common/decorators/user.decorator';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  async redirectToBillingPortalSession(
    @AuthenticatedUser() user,
    @Response() res
  ) {
    const stripeRecord = await this.prisma.stripeSync.findFirst({
      where: { relatedUser: { id: user.id } },
    });

    const url = await this.subscriptionService.createBillingPortalSession({
      customer_id: stripeRecord.stripeCustomerId,
    });

    res.redirect(url);
  }
}
