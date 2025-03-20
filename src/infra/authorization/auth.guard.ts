import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedException } from 'src/domain/exceptions/common/unauthorized.exception';
import { AuthorizerService } from '../../domain/services/authorizer.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthorizerService)
    private readonly authorizerService: AuthorizerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.authorizerService.authorize(token);
    request.user = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
