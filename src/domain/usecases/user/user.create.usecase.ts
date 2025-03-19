import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { UserEmailAlreadyExistsException } from 'src/domain/exceptions/user/user.email-already-exitst.exception';
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
    await this.verifyUniqueEmail(params);

    const user = await this.generateEntity(params);

    return await this.userRepository.create(user);
  }

  private async verifyUniqueEmail(params: UserCreateUseCaseParams) {
    const userWithSameEmail = await this.userRepository.findByEmail(
      params.email,
    );
    if (userWithSameEmail) {
      throw new UserEmailAlreadyExistsException();
    }
  }

  private async generateEntity(params: UserCreateUseCaseParams) {
    const hashedPassword = await this.hashService.hash(params.password);

    return UserEntity.new({
      name: params.name,
      email: params.email,
      password: hashedPassword,
    });
  }
}

export type UserCreateUseCaseParams = {
  name: string;
  email: string;
  password: string;
};
