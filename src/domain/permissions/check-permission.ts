import { AuthenticatedUserPayload } from '../usecases/user/user.login.usecase';
import {
  RESOURCE_PERMISSIONS,
  ResourcePermissions,
} from './permission.resource';

export function checkinPermission<Resource extends keyof ResourcePermissions>(
  user: AuthenticatedUserPayload,
  resource: Resource,
  action: ResourcePermissions[Resource]['actions'],
  data?: ResourcePermissions[Resource]['dataType'],
): boolean {
  const permissionRule = RESOURCE_PERMISSIONS[resource]?.[action];

  if (permissionRule === undefined) return false;

  if (typeof permissionRule === 'boolean') return permissionRule;

  if (data === undefined) return false;

  return permissionRule(user, data);
}
