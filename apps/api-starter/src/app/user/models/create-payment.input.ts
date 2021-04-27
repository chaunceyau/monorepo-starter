import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class CreatePaymentInput {
  @Field(_type => String)
  payment_method_id: string
  @Field(_type => String)
  brand: string
  @Field(_type => Int)
  exp_month: number
  @Field(_type => Int)
  exp_year: number
  @Field(_type => Int)
  last_4: number
  @Field(_type => Int)
  created: number
}
