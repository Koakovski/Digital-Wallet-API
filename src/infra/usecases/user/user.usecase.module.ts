import { Module } from '@nestjs/common';
import { UserCreateUseCase } from 'src/domain/usecases/user/user.create.usecase';
import { UserLoginUseCase } from 'src/domain/usecases/user/user.login.usecase';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserCreateUseCase, UserLoginUseCase],
  exports: [UserCreateUseCase, UserLoginUseCase],
})
export class UserUseCaseModule {}
