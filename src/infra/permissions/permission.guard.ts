import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthenticatedUserPayload } from 'src/domain/usecases/user/user.login.usecase';
import {
  PermissionMetadata,
  PERMISSIONS_METADATA_KEY,
} from './permission.decorator';
import { ResourcePermissions } from 'src/domain/permissions/permission.resource';
import { checkinPermission } from 'src/domain/permissions/check-permission';

@Injectable()
export class PermissionGuard<Resource extends keyof ResourcePermissions>
  implements CanActivate
{
  constructor(
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as AuthenticatedUserPayload;

    if (!user) {
      throw new ForbiddenException();
    }

    const metadata = this.reflector.get<PermissionMetadata<Resource>>(
      PERMISSIONS_METADATA_KEY,
      context.getHandler(),
    );

    if (!metadata) {
      return true;
    }

    const { resource, action, dataFetcher } = metadata;
    let data: ResourcePermissions[Resource]['dataType'] | undefined = undefined;

    if (dataFetcher) {
      const params = dataFetcher.extractParams(request);
      const dataFetcherHandlerInstance = await this.moduleRef.create(
        dataFetcher.handler,
      );
      const gettedData = await dataFetcherHandlerInstance.get(params);
      if (!gettedData) {
        throw new ForbiddenException();
      }

      data = gettedData;
    }

    const hasPermission = checkinPermission(user, resource, action, data);

    if (!hasPermission) {
      throw new ForbiddenException();
    }

    return true;
  }
}
