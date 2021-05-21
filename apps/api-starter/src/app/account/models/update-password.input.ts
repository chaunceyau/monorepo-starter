import { createUnionType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { MinLength, MaxLength } from 'class-validator';

@InputType()
export class UpdatePasswordInput {
  @Field(_type => String)
  @MinLength(6)
  @MaxLength(50)
  oldPassword: string;

  @Field(_type => String)
  @MinLength(6)
  @MaxLength(50)
  newPassword: string;
}

@ObjectType()
export class UpdatePasswordSuccess {
  constructor(message: string) {
    this.message = message;
  }

  @Field(_type => String)
  message: String;
}

@ObjectType()
export class UpdatePasswordFailed {
  constructor(message: string) {
    this.message = message;
  }
  
  @Field(_type => String)
  message: String;
}

export const ChangePasswordResult = createUnionType({
  name: 'ChangePasswordResult',
  types: () => [UpdatePasswordSuccess, UpdatePasswordFailed],
});
