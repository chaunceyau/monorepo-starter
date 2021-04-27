import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SentryModuleOptions } from '@ntegral/nestjs-sentry';

@Injectable()
export class SentryConfigService {
  constructor(private configService: ConfigService) {}

  get sentryConfigObject(): SentryModuleOptions {
    return {
      dsn: this.configService.get('sentry.SENTRY_DSN'),
      debug: true,
      environment: 'dev',
      logLevel: 2,
    };
  }
}
