import {ModuleMetadata, Type} from '@nestjs/common';

export const IMAGE_UPLOAD_PROVIDER = 'IMAGE_UPLOAD_PROVIDER';

export interface ImageUploadModuleOptions {
  accessLinkExpiresIn?: number;
  uploadLinkExpiresIn?: number;
  s3: {
    region: string;
    bucket: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
  imgix: {
    domain: string;
    secureURLToken: string;
  };
}

export interface ImageUploadModuleOptionsFactory {
  createConfigOptions: () =>
    | Promise<ImageUploadModuleOptions>
    | ImageUploadModuleOptions;
}

export interface ImageUploadModuleOptionsAsync
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<ImageUploadModuleOptionsFactory>;
  useClass?: Type<ImageUploadModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ImageUploadModuleOptions> | ImageUploadModuleOptions;
  inject?: any[];
}

// export interface ImageUploadModuleOptionsAsync {
//   imports?: [];
//   useFactory: (
//     ...opts
//   ) => {
//     accessLinkExpiresIn?: number;
//     uploadLinkExpiresIn?: number;
//     s3: {
//       region: string;
//       bucket: string;
//       accessKeyId: string;
//       secretAccessKey: string;
//     };
//     imgix: {
//       domain: string;
//       secureURLToken: string;
//     };
//   };
//   inject?: [];
// }
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
  transformation?: ImageTransformationOptions;
  expireSeconds?: number;
}

type ImageTransformationOptions = WidthTransformation & HeightTransformation;

interface WidthTransformation {
  ['width']?: string;
}
interface HeightTransformation {
  ['height']?: string;
}
