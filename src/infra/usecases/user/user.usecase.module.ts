import { Module } from '@nestjs/common';
import { UserAuthorizeUseCase } from 'src/domain/usecases/user/user.authorize.usecase';
import { UserCreateUseCase } from 'src/domain/usecases/user/user.create.usecase';
import { UserFindByEmailUseCase } from 'src/domain/usecases/user/user.find-by-email.usecase';
import { UserLoginUseCase } from 'src/domain/usecases/user/user.login.usecase';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserCreateUseCase,
    UserLoginUseCase,
    UserAuthorizeUseCase,
    UserFindByEmailUseCase,
  ],
  exports: [
    UserCreateUseCase,
    UserLoginUseCase,
    UserAuthorizeUseCase,
    UserFindByEmailUseCase,
  ],
})
export class UserUseCaseModule {}
