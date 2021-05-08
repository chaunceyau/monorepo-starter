import { Module } from '@nestjs/common';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LocalConfigModule } from '../../config/config.module';
import { SentryConfigService } from '../../config/services/sentry.config';
import { GlobalConfigService } from '../../config/services/global.config';

@Module({
  imports: [
    SentryModule.forRootAsync({
      imports: [LocalConfigModule],
      useFactory: async (
        config: SentryConfigService,
        { environmentName, releaseVersion }: GlobalConfigService
      ) => ({
        dsn: config.dsn,
        debug: config.debug,
        logLevel: config.logLevel,
        environment: environmentName,
        release: releaseVersion, // must create a release in sentry.io dashboard
      }),
      inject: [SentryConfigService, GlobalConfigService],
    }),
  ],
})
export class CustomLoggerModule {}
