import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionUseCaseModule } from 'src/infra/usecases/transaction.usecase.module';

@Module({
  imports: [TransactionUseCaseModule],
  controllers: [TransactionController],
})
export class TransactionModule {}
