import { Module } from '@nestjs/common';
import { UserController } from 'src/api/user/user.controller';
import { AuthGuard } from 'src/infra/authorization/auth.guard';
import { AuthorizeUseCase } from 'src/domain/usecases/authorize.usecase';
import { UserUseCaseModule } from 'src/infra/usecases/user/user.usecase.module';
import { UserAuthorizeUseCase } from 'src/domain/usecases/user/user.authorize.usecase';

@Module({
  imports: [UserUseCaseModule],
  providers: [
    AuthGuard,
    {
      provide: AuthorizeUseCase,
      useExisting: UserAuthorizeUseCase,
    },
  ],
  controllers: [UserController],
})
export class UserControllerModule {}
