import { Module } from '@nestjs/common';
import { UserController } from 'src/api/user/user.controller';
import { UserUseCaseModule } from 'src/infra/modules/user/user.usecase.module';

@Module({
  imports: [UserUseCaseModule],
  controllers: [UserController],
})
export class UserControllerModule {}
