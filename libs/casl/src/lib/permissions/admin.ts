import { DatabaseAction, PermissionDefinition } from '../types';

export const ADMIN_PERMISSIONS: Array<PermissionDefinition> = [
  ['User', [DatabaseAction.Update, DatabaseAction.Create]],
];
