import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GlobalConfigService } from './global.config';

@Injectable()
export class CookiesConfigService {
  constructor(private configService: ConfigService, private globalConfigService: GlobalConfigService) { }

  /**
   * @returns randomly generated string
   */
  get cookieSigningKey() {
    return this.configService.get('cookies.COOKIE_SIGNING_SECRET');
  }

  /**
   * @returns e.g. 1000 * 60 * 60 * 30 * 24
   */
  get cookieMaxAge() {
    return this.configService.get('cookies.COOKIE_MAX_AGE');
  }

  /**
   *
   */
  get cookieOptions() {
    if (this.globalConfigService.inDevelopment) {
      console.log("here1")
      return {
        secure: false,
        httpOnly: false,
        domain: 'localhost',
        maxAge: this.cookieMaxAge,
      };
    }
    
    console.log("here2")
    return {
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: this.cookieMaxAge,
    };
  }
}
