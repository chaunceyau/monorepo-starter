import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class AWSConfigService {
  constructor(private configService: ConfigService) {}

  get s3_bucket() {
    return this.configService.get('aws.S3_BUCKET');
  }

  get s3_region() {
    return this.configService.get('aws.S3_REGION');
  }

  get s3_accessKeyId() {
    return this.configService.get('aws.S3_ACCESS_KEY_ID');
  }

  get s3_secretAccessKey() {
    return this.configService.get('aws.S3_SECRET_ACCESS_KEY');
  }
}
