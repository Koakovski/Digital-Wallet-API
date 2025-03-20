import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedException } from 'src/domain/exceptions/common/unauthorized.exception';
import { AuthGuardAuthorizer } from './auth.guard-authorizer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthGuardAuthorizer)
    private readonly authorizer: AuthGuardAuthorizer,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.authorizer.authorize(token);
    request.user = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
