export const IMAGE_UPLOAD_PROVIDER = 'IMAGE_UPLOAD_PROVIDER';

export interface ImageUploadModuleOptions {
  s3: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
  imgix: {
    domain: string;
    secureURLToken: string;
  };
}
export interface GenerateSignedUploadUrl {
  maxSizeBytes?: number;
  fileName: string;
  fileId: string;
  type: string;
  size: number;
  contentTypeRestrictions?: 'image/png' | 'image' | 'application/pdf';
  meta?: {
    [key: string]: any;
  };
}

export interface GetSignedImageAccessUrlOptions {
  queryParameters?: {[key: string]: any};
  transformation?: Array<{[key: string]: any}>;
  expireSeconds?: number;
}
