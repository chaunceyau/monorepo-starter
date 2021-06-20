import {DynamicModule, Global, Module} from '@nestjs/common';
import {ImageUploadService} from './image-upload.service';
import {ImageUploadModuleOptions, IMAGE_UPLOAD_PROVIDER} from './types';

@Global()
@Module({
  // imports: [],
  // providers: [ImageUploadService],
  // exports: [ImageUploadService],
})
export class ImageUploadModule {
  static forRoot(options: ImageUploadModuleOptions): DynamicModule {
    return {
      module: ImageUploadModule,
      providers: [
        {
          provide: IMAGE_UPLOAD_PROVIDER,
          useValue: options,
        },
        ImageUploadService,
      ],
      exports: [ImageUploadService],
    };
  }
}
