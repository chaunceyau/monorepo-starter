import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class ImgixConfigService {
  constructor(private configService: ConfigService) {}

  get domain() {
    return this.configService.get('imgix.IMGIX_DOMAIN');
  }

  get secureURLToken() {
    return this.configService.get('imgix.IMGIX_SECURE_URL_TOKEN');
  }
}
