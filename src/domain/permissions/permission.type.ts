import { AuthenticatedUserPayload } from '../usecases/user/user.login.usecase';
import { ResourcePermissions } from './permission.resource';

export type PermissionRule<Key extends keyof ResourcePermissions> =
  | boolean
  | ((
      user: AuthenticatedUserPayload,
      data: ResourcePermissions[Key]['dataType'],
    ) => boolean);

export type PermissionMap = {
  [Resource in keyof ResourcePermissions]?: Partial<
    Record<ResourcePermissions[Resource]['actions'], PermissionRule<Resource>>
  >;
};
