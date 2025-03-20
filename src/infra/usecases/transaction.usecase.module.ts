import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TransactionCreateByTransferUseCase } from 'src/domain/usecases/transaction/transaction.create.usecase';

@Module({
  imports: [DatabaseModule],
  providers: [TransactionCreateByTransferUseCase],
  exports: [TransactionCreateByTransferUseCase],
})
export class TransactionUseCaseModule {}
