import { Module } from '@nestjs/common';
import { UserController } from 'src/api/user/user.controller';
import { UserUseCaseModule } from 'src/infra/usecases/user/user.usecase.module';
import { UserAuthModule } from './authorization/user.auth.module';

@Module({
  imports: [UserUseCaseModule, UserAuthModule],
  controllers: [UserController],
})
export class UserControllerModule {}
