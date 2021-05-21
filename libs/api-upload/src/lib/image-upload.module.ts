import { Module } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { ImageUploadResolver } from './image-upload.resolver';

@Module({
  imports: [],
  providers: [ImageUploadResolver, ImageUploadService],
})
export class ImageUploadModule {}
