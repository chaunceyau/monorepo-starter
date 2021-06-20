import {registerAs} from '@nestjs/config';

export default registerAs('aws', () => ({
  S3_BUCKET: process.env.AWS_S3_BUCKET,
  S3_REGION: process.env.AWS_S3_REGION,
  S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
}));
