import { GlobalRole } from '@prisma/client';
import { STANDARD_PERMISSIONS } from './standard';
import { ADMIN_PERMISSIONS } from './admin';
import { OWNER_PERMISSIONS } from './owner';
import { PermissionDefinition } from '../types';

export const PermissionMap: Record<GlobalRole, Array<PermissionDefinition>> = {
  [GlobalRole.STANDARD]: STANDARD_PERMISSIONS,
  [GlobalRole.ADMIN]: ADMIN_PERMISSIONS,
  [GlobalRole.OWNER]: OWNER_PERMISSIONS,
};
