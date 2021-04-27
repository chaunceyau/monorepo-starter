import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GlobalConfigService {
  constructor(private configService: ConfigService) { }

  private frontendURL = this.configService.get('common.FRONTEND_URL');

  get port() {
    return this.configService.get('common.PORT') || 5000;

  }

  get inDevelopment() {
    return this.configService.get('common.NODE_ENV').toLowerCase() !== 'production';
  }

  /**
   * Auto-generated GraphQL Schema from annotations
   */
  get autoSchemaFile() {
    return join(process.cwd(), 'schema.graphql');
  }

  /**
   * Cors config for Apollo Server & Express
   * note: used in both places
   */
  get corsConfig() {
    return {
      // origin: '*',
      origin: 'http://' + this.frontendURL,
      credentials: true,
    };
  }
}
