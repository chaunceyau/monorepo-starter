import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType()
export class Subscription {
  @Field(type => ID)
  id: string
}
