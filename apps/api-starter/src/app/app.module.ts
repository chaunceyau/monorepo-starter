import {Module} from '@nestjs/common';
import {StripeModule} from 'nestjs-stripe';
import {GraphQLModule} from '@nestjs/graphql';
import {SentryModule} from '@ntegral/nestjs-sentry';
//
import {ImageUploadModule} from '@monorepo-starter/api-upload';
//
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {PrismaModule} from './prisma/prisma.module';
import {AccountModule} from './account/account.module';
import {LocalConfigModule} from './config/config.module';
import {GlobalConfigService} from './config/services/global.config';
import {StripeConfigService} from './config/services/stripe.config';
import {SentryConfigService} from './config/services/sentry.config';
import {SubscriptionModule} from './subscription/subscription.module';
import {UploadModule} from './common/upload/upload.module';
import {AWSConfigService} from './config/services/aws.config';
import {ImgixConfigService} from './config/services/imgix.config';
import { GraphModule } from './graph/module';
import { RepositoryModule } from './data/module';

@Module({
  imports: [
    AccountModule,
    AuthModule,
    UserModule,
    GraphModule,
    PrismaModule,
    UploadModule,
    AccountModule,
    RepositoryModule,
    LocalConfigModule,
    SubscriptionModule,
    ImageUploadModule.forRootAsync({
      imports: [LocalConfigModule],
      useFactory: (
        awsConfig: AWSConfigService,
        imgixConfig: ImgixConfigService
      ) => ({
        s3: {
          bucket: awsConfig.s3_bucket,
          region: awsConfig.s3_region,
          accessKeyId: awsConfig.s3_accessKeyId,
          secretAccessKey: awsConfig.s3_secretAccessKey,
        },
        imgix: {
          domain: imgixConfig.domain,
          secureURLToken: imgixConfig.secureURLToken,
        },
      }),
      inject: [AWSConfigService, ImgixConfigService],
    }),
    SentryModule.forRootAsync({
      imports: [LocalConfigModule],
      useFactory: async (
        config: SentryConfigService,
        {environmentName, releaseVersion}: GlobalConfigService
      ) => ({
        dsn: config.dsn,
        debug: config.debug,
        logLevel: config.logLevel,
        environment: environmentName,
        release: releaseVersion, // must create a release in sentry.io dashboard
      }),
      inject: [SentryConfigService, GlobalConfigService],
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
