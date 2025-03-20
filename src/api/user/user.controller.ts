import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserCreateUseCase } from 'src/domain/usecases/user/user.create.usecase';
import { UserCreateDto } from './dtos/user.create.dto';
import { UserPresentableEntity } from './presenters/user.presentable-entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserPresenter } from './presenters/user.presenter';
import {
  AuthenticatedUserPayload,
  UserLoginUseCase,
} from 'src/domain/usecases/user/user.login.usecase';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserLoginResponse } from './presenters/user.login-response';
import { UserFindByEmailUseCase } from 'src/domain/usecases/user/user.find-by-email.usecase';
import { AuthUser } from 'src/api/user/authorization/auth-user.decorator';
import { UserAuthGuard } from './authorization/user-auth.guard';

@ApiTags('user')
@Controller('/users')
export class UserController {
  constructor(
    private readonly userCreateUseCase: UserCreateUseCase,
    private readonly userLoginUseCase: UserLoginUseCase,
    private readonly userFindByEmailUseCase: UserFindByEmailUseCase,
  ) {}

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

  @Post('/login')
  @ApiOperation({ description: 'Login to the system' })
  @ApiOkResponse({
    type: UserLoginResponse,
  })
  async login(@Body() body: UserLoginDto): Promise<UserLoginResponse> {
    const { user, token } = await this.userLoginUseCase.execute({
      email: body.email,
      password: body.password,
    });

    const userPresentable = new UserPresenter(user).toPresent();
    return { token, user: userPresentable };
  }

  @Get('/me')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Get authenticated user data' })
  @ApiOkResponse({
    type: UserPresentableEntity,
  })
  @ApiBearerAuth()
  async me(
    @AuthUser() authUser: AuthenticatedUserPayload,
  ): Promise<UserPresentableEntity> {
    const user = await this.userFindByEmailUseCase.execute({
      email: authUser.email,
    });

    return new UserPresenter(user).toPresent();
  }
}
