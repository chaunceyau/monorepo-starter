import {DynamicModule, Global, Module, Provider} from '@nestjs/common';
import {ImageUploadService} from './image-upload.service';
import {
  ImageUploadModuleOptions,
  ImageUploadModuleOptionsAsync,
  ImageUploadModuleOptionsFactory,
  IMAGE_UPLOAD_PROVIDER,
} from './types';

export function createImageUploadProvider(
  options: ImageUploadModuleOptions
): any {
  return {provide: IMAGE_UPLOAD_PROVIDER, useValue: options || {}};
}

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
      // providers: createImageUploadProvider(options),
      //
      //
      //
      providers: [createImageUploadProvider(options), ImageUploadService],
      //
      //
      //
      // providers: [
      //   {
      //     provide: IMAGE_UPLOAD_PROVIDER,
      //     useValue: options,
      //   },
      //   ImageUploadService,
      // ],
      exports: [ImageUploadService],
    };
  }

  static forRootAsync(options: ImageUploadModuleOptionsAsync): DynamicModule {
    return {
      module: ImageUploadModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options), ImageUploadService],
      exports: [ImageUploadService],
    };
    // return {
    //   module: ImageUploadModule,
    //   providers: [
    //     {
    //       provide: IMAGE_UPLOAD_PROVIDER,
    //       useFactory: () =>,
    //     },
    //     ImageUploadService,
    //   ],
    //   exports: [ImageUploadService],
    // };
  }

  private static createAsyncProviders(
    options: ImageUploadModuleOptionsAsync
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: ImageUploadModuleOptionsAsync
  ): Provider {
    if (options.useFactory) {
      return {
        provide: IMAGE_UPLOAD_PROVIDER,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: IMAGE_UPLOAD_PROVIDER,
      useFactory: async (optionsFactory: ImageUploadModuleOptionsFactory) =>
        await optionsFactory.createConfigOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
