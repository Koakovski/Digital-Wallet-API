import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class UserCreateUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(params: UserCreateUseCaseParams): Promise<UserEntity> {
    const user = UserEntity.new({
      name: params.name,
      email: params.email,
      password: params.password,
    });

    return await this.userRepository.create(user);
  }
}

export type UserCreateUseCaseParams = {
  name: string;
  email: string;
  password: string;
};
