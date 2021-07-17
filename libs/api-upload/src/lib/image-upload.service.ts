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

/**
 *
 * [note]: all times in image upload are in seconds,
 * aws and imgix both expect seconds for expiry
 */
@Injectable()
export class ImageUploadService {
  private logger = new Logger(ImageUploadService.name);
  //
  private s3Client: S3Client;
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

  private _getUploadLinkExpiryTimeSeconds = () => {
    const expiresInSeconds = this.options.uploadLinkExpiresIn || 60 * 10;
    return Date.now() / 1000 + expiresInSeconds;
  };

  private _getAccessLinkExpiryTimeSeconds = () => {
    const expiresInSeconds = this.options.accessLinkExpiresIn || 60 * 60 * 24;
    return Date.now() / 1000 + expiresInSeconds;
  };

  public getSignedImageAccessUrl(
    fileKey: string,
    options?: GetSignedImageAccessUrlOptions
  ) {
    // TODO: enum of types of accepted uploads
    this.logger.debug(`Generating signed image access url.`);
    this.logger.debug({options});
    const urlOptions = {
      w: options?.transformation?.width || 600,
      h: options?.transformation?.height || 500,
      expires: this._getAccessLinkExpiryTimeSeconds(),
    };
    this.logger.debug(`Generated a signed asset access url.`);
    return {
      expiresAt: urlOptions.expires,
      url: this.imgixClient.buildURL(fileKey, urlOptions),
    };
  }

  public async generateSignedUploadUrl(options: GenerateSignedUploadUrl) {
    this.logger.debug(`Attempting to generate a signed upload url.`);
    const Conditions: any[] = [{bucket: this.options.s3.bucket}];
    // {acl: 'public-read'},
    // if (options.maxSizeBytes) {
    //   const sizeCondition = this.getSizeConditionString(options.size, options.maxSizeBytes)
    //   Conditions.push(sizeCondition)
    // }

    // if (options.contentTypeRestrictions) {
    //   const contentTypeRestrictions = this.getContentTypeConditionString(options.type)
    //   Conditions.push(contentTypeRestrictions)
    // }

    const {url, fields} = await createPresignedPost(this.s3Client, {
      Bucket: this.options.s3.bucket,
      Key: options.fileId + '/' + options.fileName,
      Conditions,
      Fields: {
        // acl: 'public-read',
        ...options.meta,
      },
      Expires: this._getUploadLinkExpiryTimeSeconds(),
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

  /**
   *
   * @param mimeType: 'image' | 'image/png' | 'image/jpeg'
   * @returns
   */
  private getContentTypeConditionString(mimeType: string) {
    return ['starts-with', '$Content-Type', mimeType];
  }
}
