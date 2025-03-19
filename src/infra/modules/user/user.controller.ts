import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateUseCase } from 'src/domain/usecases/user/user.create.usecase';
import { UserCreateDto } from './dtos/user.create.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userCreateUseCase: UserCreateUseCase) {}

  @Post('/')
  async create(@Body() body: UserCreateDto) {
    const user = await this.userCreateUseCase.execute({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return user;
  }
}
