import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/domain/base/usecase';
import { UserEntity } from 'src/domain/entities/user.entity';
import { UserNotFoundException } from 'src/domain/exceptions/user/user.not-found.exception';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class UserFindByEmailUseCase
  implements UseCase<UserFindByEmailUseCaseParams, UserEntity>
{
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(params: UserFindByEmailUseCaseParams): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(params.email);
    if (!user) {
      throw new UserNotFoundException(
        `User with email ${params.email} was not found`,
      );
    }

    return user;
  }
}

export type UserFindByEmailUseCaseParams = {
  email: string;
};
