import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorizeUseCase, AuthorizeUseCaseParams } from '../authorize.usecase';
import { AuthenticatedUserPayload } from './user.login.usecase';
import { EncryptService } from 'src/domain/services/encrypt.service';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class UserAuthorizeUseCase
  implements AuthorizeUseCase<AuthenticatedUserPayload>
{
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(EncryptService)
    private readonly encryptService: EncryptService,
  ) {}

  async execute(
    params: AuthorizeUseCaseParams,
  ): Promise<AuthenticatedUserPayload> {
    const payload = this.encryptService.decrypt<AuthenticatedUserPayload>(
      params.token,
    );

    await this.validateUser(payload);

    return payload;
  }

  private async validateUser(payload: AuthenticatedUserPayload) {
    const fetchedUser = await this.userRepository.findByEmail(payload.email);
    if (!fetchedUser) {
      throw new UnauthorizedException();
    }
  }
}
