import {StripeModule} from 'nestjs-stripe';
import {Test, TestingModule} from '@nestjs/testing';

import {PrismaModule} from '../../prisma/prisma.module';
import {LocalConfigModule} from '../../config/config.module';
import {SubscriptionService} from '../subscription.service';
import {SubscriptionResolver} from '../subscription.resolver';
import {StripeConfigService} from '../../config/services/stripe.config';

describe('SubscriptionResolver', () => {
  let resolver: SubscriptionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        LocalConfigModule,
        StripeModule.forRootAsync({
          imports: [LocalConfigModule],
          useFactory: (localConfigService: StripeConfigService) => ({
            apiKey: localConfigService.stripeSecretKey,
            apiVersion: localConfigService.stripeApiVersion,
          }),
          inject: [StripeConfigService],
        }),
      ],
      providers: [SubscriptionResolver, SubscriptionService],
    }).compile();

    resolver = module.get<SubscriptionResolver>(SubscriptionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
