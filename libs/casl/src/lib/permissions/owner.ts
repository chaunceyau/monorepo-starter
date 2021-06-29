import {DatabaseAction, PermissionDefinition} from '../types';

export const OWNER_PERMISSIONS: Array<PermissionDefinition> = [
  ['User', DatabaseAction.Read],
  ['User', DatabaseAction.Manage],
];
