import { Module } from '@nestjs/common';
import { UserAuthGuardModule } from '../user/authorization/user.auth.module';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [UserAuthGuardModule],
  controllers: [TransactionController],
})
export class TransactionModule {}
