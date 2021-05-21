import { Resolver, Query, Args } from '@nestjs/graphql';
import { ImageUploadService } from './image-upload.service';
import {
  AccessImageByKeyInput,
  AwsS3UploadOptions,
  PresignedImageAssetPayload,
  PresignedUploadPayload,
} from './image.model';

@Resolver()
export class ImageUploadResolver {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Query((_returns) => PresignedImageAssetPayload)
  presignedImageAccess(@Args('input') input: AccessImageByKeyInput) {
    return this.imageUploadService.getSignedImageAccessUrl(input.key, {});
  }

  @Query((_returns) => PresignedUploadPayload)
  presignedUpload(@Args('input') input: AwsS3UploadOptions) {
    return this.imageUploadService.generateSignedUploadUrl(input);
  }
}
