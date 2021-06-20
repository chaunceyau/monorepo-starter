import {Inject, Injectable, Logger} from '@nestjs/common';
import {S3Client} from '@aws-sdk/client-s3';
import {createPresignedPost} from '@aws-sdk/s3-presigned-post';
import {
  GenerateSignedUploadUrl,
  GetSignedImageAccessUrlOptions,
  ImageUploadModuleOptions,
  IMAGE_UPLOAD_PROVIDER,
} from './types';
const ImgixClient = require('@imgix/js-core');

// const client = new S3Client({
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: 'AKIA4UL6OVKXVTQYMPUZ',
//     secretAccessKey: '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',
//   },
// });

// const imgixClient = new ImgixClient({
//   domain: 'boilerplateaus.imgix.net',
//   secureURLToken: '6EEryFKDv75TYpXX',
// });

@Injectable()
export class ImageUploadService {
  private logger = new Logger(ImageUploadService.name);
  private imageExpiryTime = () => new Date().getTime() / 1000 + 60 * 10;
  private bucket = 'boilerplate-demo-bucket';
  // 
  private s3Client;
  private imgixClient;

  constructor(
    @Inject(IMAGE_UPLOAD_PROVIDER) private options: ImageUploadModuleOptions
  ) {
    this.s3Client = new S3Client({
      region: options.s3.region,
      credentials: {
        accessKeyId: options.s3.accessKeyId,
        secretAccessKey: options.s3.secretAccessKey,
      },
    });
    this.imgixClient = new ImgixClient({
      domain: options.imgix.domain,
      secureURLToken: options.imgix.secureURLToken,
    });
  }

  public getSignedImageAccessUrl(
    fileKey: string,
    options?: GetSignedImageAccessUrlOptions
  ) {
    const expires = this.imageExpiryTime();
    return {
      url: this.imgixClient.buildURL(fileKey, {
        w: 600,
        h: 500,
        expires,
      }),
    };
  }

  public async generateSignedUploadUrl(options: GenerateSignedUploadUrl) {
    this.logger.debug(`Attempting to generate a signed upload url.`);
    const Conditions: any[] = [{acl: 'public-read'}, {bucket: this.bucket}];
    // if (options.maxSizeBytes) {
    //   const sizeCondition = this.getSizeConditionString(options.size, options.maxSizeBytes)
    //   Conditions.push(sizeCondition)
    // }

    // if (options.contentTypeRestrictions) {
    //   const contentTypeRestrictions = this.getContentTypeConditionString(options.type)
    //   Conditions.push(contentTypeRestrictions)
    // }

    const {url, fields} = await createPresignedPost(this.s3Client, {
      Bucket: this.bucket,
      Key: options.fileId + '/' + options.fileName,
      Conditions,
      Fields: {
        acl: 'public-read',
        ...options.meta,
      },
      Expires: 1200,
    });
    this.logger.debug(`Successfully generated signed upload url.`);

    return {
      url,
      fields: Object.keys(fields).map(key => ({key, value: fields[key]})),
      // todo: can probably remove
      fileId: options.fileId,
    };
  }

  private getSizeConditionString(
    requestedFileSizeBytes: number,
    maxFileSizeBytes?: number
  ) {
    const sizeCondition: Array<string | number> = ['content-length-range'];

    sizeCondition.push(Math.max(requestedFileSizeBytes - 1000, 0));

    if (maxFileSizeBytes) {
      sizeCondition.push(maxFileSizeBytes);
    } else {
      // pad 1000 bytes
      sizeCondition.push(maxFileSizeBytes + 1000);
    }

    return sizeCondition;
  }

  // mimeType: 'image' | 'image/png' | 'image/jpeg'
  private getContentTypeConditionString(mimeType: string) {
    return ['starts-with', '$Content-Type', mimeType];
  }
}
