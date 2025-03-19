import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateUseCase } from 'src/domain/usecases/user/user.create.usecase';
import { UserCreateDto } from './dtos/user.create.dto';
import { UserPresentableEntity } from './presenters/user.presentable-entity';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserPresenter } from './presenters/user.presenter';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly userCreateUseCase: UserCreateUseCase) {}

  @Post('/')
  @ApiOperation({ description: 'create a new User' })
  @ApiCreatedResponse({
    type: UserPresentableEntity,
  })
  async create(@Body() body: UserCreateDto): Promise<UserPresentableEntity> {
    const user = await this.userCreateUseCase.execute({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return new UserPresenter(user).toPresent();
  }
}
