import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TransactionCreateByTransferUseCase } from 'src/domain/usecases/transaction/transaction.create-by-transfer.usecase';
import { TransactionFindPaginatedOfUserUseCase } from 'src/domain/usecases/transaction/transaction.find-paginated-of-user.usecase';

@Module({
  imports: [DatabaseModule],
  providers: [
    TransactionCreateByTransferUseCase,
    TransactionFindPaginatedOfUserUseCase,
  ],
  exports: [
    TransactionCreateByTransferUseCase,
    TransactionFindPaginatedOfUserUseCase,
  ],
})
export class TransactionUseCaseModule {}
