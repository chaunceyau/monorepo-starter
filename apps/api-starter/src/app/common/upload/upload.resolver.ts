import * as cuid from 'cuid'
import {Resolver, Query, Args} from '@nestjs/graphql';
// 
import {ImageUploadService} from '@monorepo-starter/api-upload';
// 
import {
  AccessImageByKeyInput,
  AwsS3UploadOptions,
  PresignedImageAssetPayload,
  PresignedUploadPayload,
} from './image.model';

@Resolver()
export class UploadResolver {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Query(_returns => PresignedImageAssetPayload)
  presignedImageAccess(@Args('input') input: AccessImageByKeyInput) {
    return this.imageUploadService.getSignedImageAccessUrl(input.key, {});
  }

  @Query(_returns => PresignedUploadPayload)
  presignedUpload(@Args('input') input: AwsS3UploadOptions) {
    const fileId = cuid();
    return this.imageUploadService.generateSignedUploadUrl({...input, fileId});
  }
}
