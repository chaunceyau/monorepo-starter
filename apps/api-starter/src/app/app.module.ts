import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StripeModule } from 'nestjs-stripe';
import { SentryModule } from '@ntegral/nestjs-sentry';

import { CaslModule } from './casl/casl.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccountModule } from './account/account.module';
import { LocalConfigModule } from './config/config.module';
import { SentryConfigService } from './config/services/sentry.config';
import { GlobalConfigService } from './config/services/global.config';
import { StripeConfigService } from './config/services/stripe.config';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    AccountModule,
    AuthModule,
    CaslModule,
    UserModule,
    PrismaModule,
    AccountModule,
    LocalConfigModule,
    SubscriptionModule,
    GraphQLModule.forRootAsync({
      imports: [LocalConfigModule],
      useFactory: (localConfigService: GlobalConfigService) => ({
        autoSchemaFile: localConfigService.autoSchemaFile,
        cors: localConfigService.corsConfig,
      }),
      inject: [GlobalConfigService],
    }),
    SentryModule.forRootAsync({
      imports: [LocalConfigModule],
      useFactory: async (sentryConfigService: SentryConfigService) =>
        sentryConfigService.sentryConfigObject,
      inject: [SentryConfigService],
    }),
    StripeModule.forRootAsync({
      imports: [LocalConfigModule],
      useFactory: (localConfigService: StripeConfigService) => ({
        apiKey: localConfigService.stripeSecretKey,
        apiVersion: localConfigService.stripeApiVersion,
      }),
      inject: [StripeConfigService],
    }),
  ],
})
export class AppModule {}
