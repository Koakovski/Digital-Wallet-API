import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedException } from 'src/domain/exceptions/common/unauthorized.exception';
import { AuthorizeUseCase } from '../../domain/usecases/authorize.usecase';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthorizeUseCase)
    private readonly authorizerUseCase: AuthorizeUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.authorizerUseCase.execute({ token });
    request.user = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
