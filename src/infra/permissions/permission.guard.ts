import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
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

    const { resource, action, extractParams, dataGetter } = metadata;

    const params = extractParams(request);
    const dataGetterInstance = await this.moduleRef.create(dataGetter);
    const data = await dataGetterInstance.get(params);

    if (!data) {
      throw new UnauthorizedException();
    }

    const hasPermission = checkinPermission(user, resource, action, data);

    if (!hasPermission) {
      throw new ForbiddenException();
    }

    return true;
  }
}
