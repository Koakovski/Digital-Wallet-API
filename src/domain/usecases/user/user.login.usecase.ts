import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UseCase } from 'src/domain/base/usecase';
import { UserEntity } from 'src/domain/entities/user.entity';
import { UserNotFoundException } from 'src/domain/exceptions/user/user.not-found.exception';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { EncryptService } from 'src/domain/services/encrypt.service';
import { HashService } from 'src/domain/services/hash.service';

@Injectable()
export class UserLoginUseCase
  implements UseCase<UserLoginUseCaseParams, UserLoginUseCaseResult>
{
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(HashService)
    private readonly hashService: HashService,
    @Inject(EncryptService)
    private readonly encryptService: EncryptService,
  ) {}

  async execute(
    params: UserLoginUseCaseParams,
  ): Promise<UserLoginUseCaseResult> {
    const user = await this.fetchUser(params);
    await this.validatePassword(user, params);

    const payload: AuthorizedUserPayload = {
      id: user.id,
      email: user.email,
    };

    const token = this.encryptService.encrypt(payload);

    return {
      token,
      user,
    };
  }

  private async fetchUser(params: UserLoginUseCaseParams) {
    const user = await this.userRepository.findByEmail(params.email);
    if (!user) {
      throw new UserNotFoundException(
        `User with email ${params.email} was not found`,
      );
    }

    return user;
  }

  private async validatePassword(
    user: UserEntity,
    params: UserLoginUseCaseParams,
  ) {
    const isPasswordValid = await this.hashService.compare(
      params.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
  }
}

export type UserLoginUseCaseParams = {
  email: string;
  password: string;
};

export type UserLoginUseCaseResult = {
  token: string;
  user: UserEntity;
};

export type AuthorizedUserPayload = {
  id: string;
  email: string;
};
