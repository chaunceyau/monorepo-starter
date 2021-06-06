import Stripe from 'stripe';
import {StripeSync, User} from '@prisma/client';
import {InjectStripe} from 'nestjs-stripe';
import {Injectable, Logger} from '@nestjs/common';
//
import {PremiumPlanType} from './models/create-subscription.input';
import {StripeConfigService} from '../config/services/stripe.config';
import {ResponseObjectUser} from '../common/decorators/user.decorator';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(
    private readonly prisma: PrismaService,
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly stripeConfigService: StripeConfigService
  ) {}

  private async getStripeSyncForViewer(user: User): Promise<StripeSync | null> {
    const stripeSync = await this.prisma.stripeSync.findUnique({
      where: {
        relatedUserId: user.id,
      },
    });

    if (!stripeSync) {
      return null;
    }
  }

  async getViewerSubscription(
    user: ResponseObjectUser
  ): Promise<Stripe.Subscription | null> {
    const stripeSync = await this.getStripeSyncForViewer(user);

    if (!stripeSync) { 
      return null;
    }
    
    const subscriptions = await this.stripeClient.subscriptions.list({
      customer: stripeSync.stripeCustomerId,
    });

    return subscriptions[0];
  }

  async createCheckoutSession({user, priceId}: CreateCheckoutSession) {
    const stripeSync = await this.getStripeSyncForViewer(user);

    if (!stripeSync) { 
      return null;
    }

    const session = this.stripeClient.checkout.sessions.create({
      success_url: this.stripeConfigService.checkoutSuccessRedirectURL,
      cancel_url: this.stripeConfigService.checkoutCancelRedirectURL,
      payment_method_types: ['card'],
      mode: 'subscription',
      customer: stripeSync.stripeCustomerId,
      line_items: [{price: priceId, quantity: 1}],
    });

    return session;
  }

  async createBillingPortalSession({
    customer_id,
  }): Promise<Stripe.BillingPortal.Session | null> {
    try {
      const session = await this.stripeClient.billingPortal.sessions.create({
        customer: customer_id,
        return_url: this.stripeConfigService.billingPortalRedirectURL,
      });
      return session;
    } catch (err) {
      this.logger.warn(
        `Failed to create billing session.`,
        `createBillingPortalSession`
      );
      return null;
    }
  }

  async createSubscription({payment_method_id, customer_id, price_id}) {
    // Attach the payment method to the customer
    try {
      await this.stripeClient.paymentMethods.attach(payment_method_id, {
        customer: customer_id,
      });
    } catch (error) {
      throw new Error('Failed to attach payment method.');
      // return res.status('402').send({ error: { message: error.message } })
    }
    // Change the default invoice settings on the customer to the new payment method
    await this.stripeClient.customers.update(customer_id, {
      invoice_settings: {
        default_payment_method: payment_method_id,
      },
    });
    // Create the subscription
    const subscription = await this.stripeClient.subscriptions.create({
      customer: customer_id,
      items: [{price: price_id}],
      expand: ['latest_invoice.payment_intent'],
    });
    return subscription;
  }

  getPriceIdForPremiumPlan(plan: PremiumPlanType) {
    if (plan.toString() === 'PREMIUM_MONTHLY')
      return this.stripeConfigService.monthlySubscriptionPriceId;
    else if (plan.toString() === 'PREMIUM_ANNUAL')
      return this.stripeConfigService.annualSubscriptionPriceId;
  }
}

interface CreateCheckoutSession {
  user: User;
  priceId: string;
}
