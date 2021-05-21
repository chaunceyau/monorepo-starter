import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { GenerateSignedUploadUrl } from './types';
const ImgixClient = require('@imgix/js-core');

const client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIA4UL6OVKXVTQYMPUZ',
    secretAccessKey: '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',
  },
});

const imgixClient = new ImgixClient({
  domain: 'boilerplateaus.imgix.net',
  secureURLToken: '6EEryFKDv75TYpXX',
});

@Injectable()
export class ImageUploadService {
  getSignedImageAccessUrl(
    fileKey: string,
    options: {
      queryParameters?: { [key: string]: any };
      transformation?: { [key: string]: any }[];
      expireSeconds?: number;
    },
  ) {
    const expires = new Date().getTime() / 1000 + 60 * 10;
    return {
      url: imgixClient.buildURL(fileKey, {
        w: 600,
        h: 500,
        expires,
      }),
    };
  }

  getSizeConditionString(
    requestedFileSizeBytes: number,
    maxFileSizeBytes?: number,
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
  getContentTypeConditionString(mimeType: string) {
    return ['starts-with', '$Content-Type', mimeType];
  }

  async generateSignedUploadUrl(options: GenerateSignedUploadUrl) {
    const Conditions: any[] = [
      { acl: 'public-read' },
      { bucket: 'test-signed-requests' },
    ];
    // if (options.maxSizeBytes) {
    //   const sizeCondition = this.getSizeConditionString(options.size, options.maxSizeBytes)
    //   Conditions.push(sizeCondition)
    // }

    // if (options.contentTypeRestrictions) {
    //   const contentTypeRestrictions = this.getContentTypeConditionString(options.type)
    //   Conditions.push(contentTypeRestrictions)
    // }

    const { url, fields } = await createPresignedPost(client, {
      Bucket: 'test-signed-requests',
      Key: options.fileId + '/' + options.fileName,
      Conditions,
      Fields: {
        acl: 'public-read',
        ...options.meta,
      },
      Expires: 1200,
    });

    return {
      url,
      fields: Object.keys(fields).map(key => ({ key, value: fields[key] })),
      // todo: can probably remove
      fileId: options.fileId,
    };
  }
}