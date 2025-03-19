import { Controller, Post } from '@nestjs/common';
import { UserCreateUseCase } from 'src/domain/usecases/user/user.create.usecase';

@Controller('/user')
export class UserController {
  constructor(private readonly userCreateUseCase: UserCreateUseCase) {}

  @Post('/')
  async create() {
    const user = await this.userCreateUseCase.execute({
      name: '',
      email: '',
      password: '',
    });

    return user;
  }
}
