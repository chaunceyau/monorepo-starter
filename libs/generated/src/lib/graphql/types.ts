import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AccessImageByKeyInput = {
  key: Scalars['String'];
};

export type AwsS3UploadDataField = {
  __typename?: 'AwsS3UploadDataField';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type AwsS3UploadOptions = {
  type: Scalars['String'];
  size: Scalars['Int'];
  fileName: Scalars['String'];
  fileId: Scalars['String'];
};

export type ChangePasswordResult = UpdatePasswordSuccess | UpdatePasswordFailed;

export type CheckoutSession = {
  __typename?: 'CheckoutSession';
  id: Scalars['ID'];
};

export type ConnectionArguments = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ChangePasswordResult;
  stripeCheckoutSession: CheckoutSession;
};


export type MutationChangePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationStripeCheckoutSessionArgs = {
  input: StripeCheckoutSessionInput;
};

export type PaginationPageInfo = {
  __typename?: 'PaginationPageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type PresignedImageAssetPayload = {
  __typename?: 'PresignedImageAssetPayload';
  url: Scalars['String'];
};

export type PresignedUploadPayload = {
  __typename?: 'PresignedUploadPayload';
  fileId: Scalars['String'];
  url: Scalars['String'];
  fields: Array<AwsS3UploadDataField>;
};

export type Query = {
  __typename?: 'Query';
  viewer: User;
  userById: User;
  users: UserConnection;
  presignedImageAccess: PresignedImageAssetPayload;
  presignedUpload: PresignedUploadPayload;
  stripePortalSession?: Maybe<Scalars['String']>;
  subscription?: Maybe<Subscription>;
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  input?: Maybe<ConnectionArguments>;
};


export type QueryPresignedImageAccessArgs = {
  input: AccessImageByKeyInput;
};


export type QueryPresignedUploadArgs = {
  input: AwsS3UploadOptions;
};

export type StripeCheckoutSessionInput = {
  plan: SubscriptionPlan;
};

export type Subscription = {
  __typename?: 'Subscription';
  id: Scalars['ID'];
  planTitle: Scalars['String'];
  planAmount: Scalars['Int'];
  billingFrequency: Scalars['String'];
  upcomingAmountDue: Scalars['Int'];
  upcomingDueDate: Scalars['Int'];
};

export enum SubscriptionPlan {
  PremiumMonthly = 'PREMIUM_MONTHLY',
  PremiumAnnual = 'PREMIUM_ANNUAL'
}

export type UpdatePasswordFailed = {
  __typename?: 'UpdatePasswordFailed';
  message: Scalars['String'];
};

export type UpdatePasswordInput = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type UpdatePasswordSuccess = {
  __typename?: 'UpdatePasswordSuccess';
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  subscription?: Maybe<Subscription>;
  avatar?: Maybe<UserAvatar>;
};

export type UserAvatar = {
  __typename?: 'UserAvatar';
  url: Scalars['String'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<UserGraphModelEdge>>;
  nodes?: Maybe<Array<User>>;
  pageInfo: PaginationPageInfo;
};

export type UserGraphModelEdge = {
  __typename?: 'UserGraphModelEdge';
  cursor: Scalars['String'];
  node: User;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccessImageByKeyInput: AccessImageByKeyInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  AwsS3UploadDataField: ResolverTypeWrapper<AwsS3UploadDataField>;
  AwsS3UploadOptions: AwsS3UploadOptions;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ChangePasswordResult: ResolversTypes['UpdatePasswordSuccess'] | ResolversTypes['UpdatePasswordFailed'];
  CheckoutSession: ResolverTypeWrapper<CheckoutSession>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ConnectionArguments: ConnectionArguments;
  Mutation: ResolverTypeWrapper<{}>;
  PaginationPageInfo: ResolverTypeWrapper<PaginationPageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  PresignedImageAssetPayload: ResolverTypeWrapper<PresignedImageAssetPayload>;
  PresignedUploadPayload: ResolverTypeWrapper<PresignedUploadPayload>;
  Query: ResolverTypeWrapper<{}>;
  StripeCheckoutSessionInput: StripeCheckoutSessionInput;
  Subscription: ResolverTypeWrapper<{}>;
  SubscriptionPlan: SubscriptionPlan;
  UpdatePasswordFailed: ResolverTypeWrapper<UpdatePasswordFailed>;
  UpdatePasswordInput: UpdatePasswordInput;
  UpdatePasswordSuccess: ResolverTypeWrapper<UpdatePasswordSuccess>;
  User: ResolverTypeWrapper<User>;
  UserAvatar: ResolverTypeWrapper<UserAvatar>;
  UserConnection: ResolverTypeWrapper<UserConnection>;
  UserGraphModelEdge: ResolverTypeWrapper<UserGraphModelEdge>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccessImageByKeyInput: AccessImageByKeyInput;
  String: Scalars['String'];
  AwsS3UploadDataField: AwsS3UploadDataField;
  AwsS3UploadOptions: AwsS3UploadOptions;
  Int: Scalars['Int'];
  ChangePasswordResult: ResolversParentTypes['UpdatePasswordSuccess'] | ResolversParentTypes['UpdatePasswordFailed'];
  CheckoutSession: CheckoutSession;
  ID: Scalars['ID'];
  ConnectionArguments: ConnectionArguments;
  Mutation: {};
  PaginationPageInfo: PaginationPageInfo;
  Boolean: Scalars['Boolean'];
  PresignedImageAssetPayload: PresignedImageAssetPayload;
  PresignedUploadPayload: PresignedUploadPayload;
  Query: {};
  StripeCheckoutSessionInput: StripeCheckoutSessionInput;
  Subscription: {};
  UpdatePasswordFailed: UpdatePasswordFailed;
  UpdatePasswordInput: UpdatePasswordInput;
  UpdatePasswordSuccess: UpdatePasswordSuccess;
  User: User;
  UserAvatar: UserAvatar;
  UserConnection: UserConnection;
  UserGraphModelEdge: UserGraphModelEdge;
};

export type AwsS3UploadDataFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['AwsS3UploadDataField'] = ResolversParentTypes['AwsS3UploadDataField']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangePasswordResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangePasswordResult'] = ResolversParentTypes['ChangePasswordResult']> = {
  __resolveType: TypeResolveFn<'UpdatePasswordSuccess' | 'UpdatePasswordFailed', ParentType, ContextType>;
};

export type CheckoutSessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutSession'] = ResolversParentTypes['CheckoutSession']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  changePassword?: Resolver<ResolversTypes['ChangePasswordResult'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'input'>>;
  stripeCheckoutSession?: Resolver<ResolversTypes['CheckoutSession'], ParentType, ContextType, RequireFields<MutationStripeCheckoutSessionArgs, 'input'>>;
};

export type PaginationPageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginationPageInfo'] = ResolversParentTypes['PaginationPageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PresignedImageAssetPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PresignedImageAssetPayload'] = ResolversParentTypes['PresignedImageAssetPayload']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PresignedUploadPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PresignedUploadPayload'] = ResolversParentTypes['PresignedUploadPayload']> = {
  fileId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fields?: Resolver<Array<ResolversTypes['AwsS3UploadDataField']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  viewer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userById?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserByIdArgs, 'id'>>;
  users?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<QueryUsersArgs, 'input'>>;
  presignedImageAccess?: Resolver<ResolversTypes['PresignedImageAssetPayload'], ParentType, ContextType, RequireFields<QueryPresignedImageAccessArgs, 'input'>>;
  presignedUpload?: Resolver<ResolversTypes['PresignedUploadPayload'], ParentType, ContextType, RequireFields<QueryPresignedUploadArgs, 'input'>>;
  stripePortalSession?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subscription?: Resolver<Maybe<ResolversTypes['Subscription']>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  id?: SubscriptionResolver<ResolversTypes['ID'], "id", ParentType, ContextType>;
  planTitle?: SubscriptionResolver<ResolversTypes['String'], "planTitle", ParentType, ContextType>;
  planAmount?: SubscriptionResolver<ResolversTypes['Int'], "planAmount", ParentType, ContextType>;
  billingFrequency?: SubscriptionResolver<ResolversTypes['String'], "billingFrequency", ParentType, ContextType>;
  upcomingAmountDue?: SubscriptionResolver<ResolversTypes['Int'], "upcomingAmountDue", ParentType, ContextType>;
  upcomingDueDate?: SubscriptionResolver<ResolversTypes['Int'], "upcomingDueDate", ParentType, ContextType>;
};

export type UpdatePasswordFailedResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdatePasswordFailed'] = ResolversParentTypes['UpdatePasswordFailed']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePasswordSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdatePasswordSuccess'] = ResolversParentTypes['UpdatePasswordSuccess']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subscription?: Resolver<Maybe<ResolversTypes['Subscription']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['UserAvatar']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAvatarResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAvatar'] = ResolversParentTypes['UserAvatar']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['UserGraphModelEdge']>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PaginationPageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserGraphModelEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserGraphModelEdge'] = ResolversParentTypes['UserGraphModelEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AwsS3UploadDataField?: AwsS3UploadDataFieldResolvers<ContextType>;
  ChangePasswordResult?: ChangePasswordResultResolvers<ContextType>;
  CheckoutSession?: CheckoutSessionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginationPageInfo?: PaginationPageInfoResolvers<ContextType>;
  PresignedImageAssetPayload?: PresignedImageAssetPayloadResolvers<ContextType>;
  PresignedUploadPayload?: PresignedUploadPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  UpdatePasswordFailed?: UpdatePasswordFailedResolvers<ContextType>;
  UpdatePasswordSuccess?: UpdatePasswordSuccessResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAvatar?: UserAvatarResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserGraphModelEdge?: UserGraphModelEdgeResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "ChangePasswordResult": [
      "UpdatePasswordSuccess",
      "UpdatePasswordFailed"
    ]
  }
};
      export default result;
    