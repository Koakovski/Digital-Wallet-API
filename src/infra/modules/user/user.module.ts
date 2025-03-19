import { Module } from '@nestjs/common';
import { UserCreateUseCase } from 'src/domain/usecases/user/user.create.usecase';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserCreateUseCase],
  controllers: [UserController],
})
export class UserModule {}
