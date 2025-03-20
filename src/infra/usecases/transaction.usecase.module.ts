import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TransactionCreateUseCase } from 'src/domain/usecases/transaction/transaction.create.usecase';

@Module({
  imports: [DatabaseModule],
  providers: [TransactionCreateUseCase],
  exports: [TransactionCreateUseCase],
})
export class TransactionUseCaseModule {}
