import {registerAs} from '@nestjs/config';

export default registerAs('imgix', () => ({
  IMGIX_DOMAIN: process.env.IMGIX_DOMAIN,
  IMGIX_SECURE_URL_TOKEN: process.env.IMGIX_SECURE_URL_TOKEN,
}));
