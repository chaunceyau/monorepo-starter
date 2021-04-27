import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeConfigService {
  constructor(private configService: ConfigService) {}

  /*
   *
   */
  get stripeSecretKey() {
    return this.configService.get('stripe.STRIPE_SECRET_KEY');
  }

  /*
   *
   */
  get stripeApiVersion() {
    return this.configService.get('stripe.STRIPE_API_VERSION');
  }

  /*
   *
   */
  get monthlySubscriptionPriceId() {
    return this.configService.get(
      'stripe.STRIPE_SUBSCRIPTION_MONTHLY_PRICE_ID'
    );
  }

  /*
   *
   */
  get annualSubscriptionPriceId() {
    return this.configService.get('stripe.STRIPE_SUBSCRIPTION_ANNUAL_PRICE_ID');
  }

  /*
   *
   */
  get billingPortalRedirectURL() {
    return this.configService.get('stripe.STRIPE_BILLING_PORTAL_REDIRECT_URL');
  }

  /*
   *
   */
  get checkoutSuccessRedirectURL() {
    return this.configService.get(
      'stripe.STRIPE_CHECKOUT_SUCCESS_REDIRECT_URL'
    );
  }

  /*
   *
   */
  get checkoutCancelRedirectURL() {
    return this.configService.get('stripe.STRIPE_CHECKOUT_CANCEL_REDIRECT_URL');
  }
}
