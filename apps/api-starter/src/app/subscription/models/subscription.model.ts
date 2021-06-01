import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { CurrencyScalar } from '../../common/graphql/currency-scalar';

@ObjectType('Subscription')
export class SubscriptionGraphModel {
  @Field(_type => ID)
  id: string;

  @Field()
  planTitle: string;

  @Field(_type => Int)
  planAmount: number;

  @Field()
  billingFrequency: string;

  @Field(_type => Int)
  upcomingAmountDue: number;

  @Field(_type => Int)
  upcomingDueDate: number;
}
