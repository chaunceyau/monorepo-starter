import {DatabaseAction, PermissionDefinition} from '../types';

export const STANDARD_PERMISSIONS: Array<PermissionDefinition> = [
  ['User', [DatabaseAction.Read]],
];
