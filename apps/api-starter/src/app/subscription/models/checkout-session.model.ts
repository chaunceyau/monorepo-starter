import {Field, ObjectType, ID} from '@nestjs/graphql';

@ObjectType('CheckoutSession')
export class CheckoutSessionGraphModel {
  @Field(_type => ID)
  id: string;
}
