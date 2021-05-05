import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  /**
   * @returns randomly generated string
   */
  get jwtSigningKey() {
    return this.configService.get('jwt.JWT_SIGNING_KEY');
  }
}
