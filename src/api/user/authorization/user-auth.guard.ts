import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedException } from 'src/domain/exceptions/common/unauthorized.exception';
import { UserAuthorizeUseCase } from 'src/domain/usecases/user/user.authorize.usecase';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly authorizeUseCase: UserAuthorizeUseCase) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.authorizeUseCase.execute({ token });
    request.user = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
