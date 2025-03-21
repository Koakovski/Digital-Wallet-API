import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';
import { ResourcePermissions } from 'src/domain/permissions/permission.resource';

export const PERMISSIONS_METADATA_KEY = 'permissions_metadata';

export interface PermissionDataGetter<Params, Data> {
  get(params: Params): Promise<Data | null>;
}

export type PermissionMetadata<
  Resource extends keyof ResourcePermissions,
  DataGetterParams = object,
> = {
  resource: Resource;
  action: ResourcePermissions[Resource]['actions'];
  extractParams: (request: Request) => DataGetterParams;
  dataGetter: new (
    ...args: any[]
  ) => PermissionDataGetter<
    DataGetterParams,
    ResourcePermissions[Resource]['dataType']
  >;
};
export const Permission = <
  Resource extends keyof ResourcePermissions,
  DataGetterParams = object,
>(
  metadata: PermissionMetadata<Resource, DataGetterParams>,
) => SetMetadata(PERMISSIONS_METADATA_KEY, metadata);
