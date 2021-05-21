import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class SentryConfigService {
  constructor(private configService: ConfigService) {}

  get dsn(): string {
    return this.configService.get('sentry.SENTRY_DSN');
  }

  get debug(): boolean {
    return this.configService.get('sentry.SENTRY_DEBUG');
  }

  get logLevel(): number {
    return this.configService.get('sentry.SENTRY_LOG_LEVEL');
  }
}
