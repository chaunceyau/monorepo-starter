import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';

@ObjectType()
export class PresignedUploadPayload {
  @Field((_type) => String)
  fileId: string;
  @Field((_type) => String)
  url: string;
  @Field((_type) => [AwsS3UploadDataField])
  fields: AwsS3UploadDataField[];
}

@ObjectType()
export class AwsS3UploadDataField {
  @Field((_type) => String)
  key: string;
  @Field((_type) => String)
  value: string;
}

@ObjectType()
export class PresignedImageAssetPayload {
  @Field((_type) => String)
  url: string;
}

@InputType()
export class AccessImageByKeyInput {
  @Field((_type) => String)
  key: string;
}

@InputType()
export class AwsS3UploadOptions {
  @Field((_type) => String)
  type: string;
  @Field((_type) => Int)
  size: number;
  @Field((_type) => String)
  fileName: string;
  @Field((_type) => String)
  fileId: string;
}
