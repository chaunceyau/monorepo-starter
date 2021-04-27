import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
// import { SubscriptionType } from '@prisma/client'

@ObjectType()
export class User {
  @Field(_type => String)
  id: string;
  @Field(_type => String)
  email: string;
  // @Field(_type => SubscriptionType)
  // subscription_type: SubscriptionType
}

// enum SubscriptionType {
//   FREE_TIER = 'FREE_TIER',
//   PREMIUM_SUBSCRIBER = 'PREMIUM_SUBSCRIBER',
//   ENTERPRISE_SUBSCRIBER = 'ENTERPRISE_SUBSCRIBER',
// }

// registerEnumType(SubscriptionType, {
//   name: 'SubscriptionType',
//   description: 'Type of subscription account is associated with.',
// })
