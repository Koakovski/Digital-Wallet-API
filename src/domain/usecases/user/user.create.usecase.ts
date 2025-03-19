import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { HashService } from 'src/domain/services/hash.service';

@Injectable()
export class UserCreateUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(HashService)
    private readonly hashService: HashService,
  ) {}

  async execute(params: UserCreateUseCaseParams): Promise<UserEntity> {
    const hashedPassword = await this.hashService.hash(params.password);

    const user = UserEntity.new({
      name: params.name,
      email: params.email,
      password: hashedPassword,
    });

    return await this.userRepository.create(user);
  }
}

export type UserCreateUseCaseParams = {
  name: string;
  email: string;
  password: string;
};
