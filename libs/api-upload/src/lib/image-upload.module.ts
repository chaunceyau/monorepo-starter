import {DynamicModule, Global, Module, Provider} from '@nestjs/common';
import {ImageUploadService} from './image-upload.service';
import {
  ImageUploadModuleOptions,
  ImageUploadModuleOptionsAsync,
  ImageUploadModuleOptionsFactory,
  IMAGE_UPLOAD_PROVIDER,
} from './types';

@Global()
@Module({})
export class ImageUploadModule {
  static forRoot(options: ImageUploadModuleOptions): DynamicModule {
    return {
      module: ImageUploadModule,
      providers: [this._createStaticProvider(options), ImageUploadService],
      exports: [ImageUploadService],
    };
  }

  static forRootAsync(options: ImageUploadModuleOptionsAsync): DynamicModule {
    return {
      module: ImageUploadModule,
      imports: options.imports || [],
      providers: [...this._createAsyncProviders(options), ImageUploadService],
      exports: [ImageUploadService],
    };
  }

  private static _createStaticProvider(options: ImageUploadModuleOptions) {
    return {provide: IMAGE_UPLOAD_PROVIDER, useValue: options || {}};
  }

  private static _createAsyncProviders(
    options: ImageUploadModuleOptionsAsync
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this._createAsyncOptionsProvider(options)];
    }
    return [
      this._createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static _createAsyncOptionsProvider(
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
