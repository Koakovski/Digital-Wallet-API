import { Module } from '@nestjs/common';
import { UserAuthGuard } from './user-auth.guard';
import { UserUseCaseModule } from 'src/infra/usecases/user/user.usecase.module';

@Module({
  imports: [UserUseCaseModule],
  providers: [UserAuthGuard],
  exports: [UserAuthGuard],
})
export class UserAuthGuardModule {}
