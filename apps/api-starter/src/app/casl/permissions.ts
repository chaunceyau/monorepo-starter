import { Action } from './policy-types';

export enum Roels {
  ADMIN = 'ADMIN',
}

export const PermissionMap = {
  [Roels.ADMIN]: [['User', [Action.Update, Action.Read, Action.Create]]],
};
