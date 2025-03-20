import { Module } from '@nestjs/common';
import { UserController } from 'src/api/user/user.controller';
import { UserUseCaseModule } from 'src/infra/usecases/user/user.usecase.module';

@Module({
  imports: [UserUseCaseModule],
  controllers: [UserController],
})
export class UserControllerModule {}
