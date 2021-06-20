import {ObjectType, Field, registerEnumType} from '@nestjs/graphql';
import {Paginated} from '../../common/pagination';
import {SubscriptionGraphModel} from '../../subscription/models/subscription.model';
// import { SubscriptionType } from '@prisma/client'

@ObjectType('UserAvatar')
export class UserAvatarGraphModel {
  @Field(_type => String)
  url: string;
  // @Field(_type => String)
  // awsFileKey: string;
}

@ObjectType('User')
export class UserGraphModel {
  @Field(_type => String)
  id: string;
  @Field(_type => String)
  email: string;
  @Field(_type => SubscriptionGraphModel, {nullable: true})
  subscription?: SubscriptionGraphModel;
  // @Field(_type => SubscriptionType)
  // subscription_type: SubscriptionType
}

@ObjectType('UserConnection')
export class UserConnectionGraphModel extends Paginated(UserGraphModel) {}

// enum SubscriptionType {
//   FREE_TIER = 'FREE_TIER',
//   PREMIUM_SUBSCRIBER = 'PREMIUM_SUBSCRIBER',
//   ENTERPRISE_SUBSCRIBER = 'ENTERPRISE_SUBSCRIBER',
// }

// registerEnumType(SubscriptionType, {
//   name: 'SubscriptionType',
//   description: 'Type of subscription account is associated with.',
// })
