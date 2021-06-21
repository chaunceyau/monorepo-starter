import {StripeModule} from 'nestjs-stripe';
import {Test, TestingModule} from '@nestjs/testing';

import {PrismaModule} from '../../prisma/prisma.module';
import {LocalConfigModule} from '../../config/config.module';
import {SubscriptionService} from '../subscription.service';
import {SubscriptionResolver} from '../subscription.resolver';
import {StripeConfigService} from '../../config/services/stripe.config';

describe('SubscriptionService', () => {
  let service: SubscriptionService;

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
      providers: [SubscriptionResolver, SubscriptionService],    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
