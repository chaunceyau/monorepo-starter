import {PrismaAbility, Subjects} from '@casl/prisma';
import {
  User,
  Prisma,
  UserNotification,
  StripeSync,
  S3Sync,
} from '@prisma/client';

export enum DatabaseAction {
  // ReadOwn = 'read_own',
  Read = 'read',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
  Manage = 'manage',
}

export type PrismaDatabaseSubject = Subjects<{
  User: User;
  S3Sync: S3Sync;
  StripeSync: StripeSync;
  UserNotification: UserNotification;
}>;

export type RbacAbility = PrismaAbility<
  [DatabaseAction, PrismaDatabaseSubject]
>;

export type PermissionDefinition =
  | PermissionDefinitionWithPrismaConditions
  | PermissionDefinitionWithoutPrismaConditions;

export type PermissionDefinitionWithPrismaConditions = [
  PrismaDatabaseSubject,
  DatabaseAction | Array<DatabaseAction>,
  (user) => Prisma.UserWhereUniqueInput
];
export type PermissionDefinitionWithoutPrismaConditions = [
  PrismaDatabaseSubject,
  DatabaseAction | Array<DatabaseAction>
];
