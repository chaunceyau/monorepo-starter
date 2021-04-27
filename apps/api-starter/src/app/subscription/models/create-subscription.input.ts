import { Field, ObjectType, InputType, registerEnumType } from '@nestjs/graphql'

@InputType()
export class CreateSubscriptionInput {
  @Field(_type => PremiumPlanType)
  plan: PremiumPlanType
  // @Field(_type => String)
  // payment_method_id: string
}

@ObjectType()
export class CreateSubscriptionResponse {
  @Field(_type => String)
  id: string
}

export enum PremiumPlanType {
  PREMIUM_MONTHLY = 'PREMIUM_MONTHLY',
  PREMIUM_ANNUAL = 'PREMIUM_ANNUAL',
}

registerEnumType(PremiumPlanType, {
  name: 'SubscriptionPlan',
})
