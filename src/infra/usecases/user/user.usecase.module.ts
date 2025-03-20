import { Module } from '@nestjs/common';
import { UserCreateUseCase } from 'src/domain/usecases/user/user.create.usecase';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserCreateUseCase],
  exports: [UserCreateUseCase],
})
export class UserUseCaseModule {}
