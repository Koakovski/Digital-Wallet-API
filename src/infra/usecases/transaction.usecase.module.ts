import { Module } from '@nestjs/common';
import { TransactionCreateByTransferUseCase } from 'src/domain/usecases/transaction/transaction.create-by-transfer.usecase';
import { TransactionFindPaginatedOfUserUseCase } from 'src/domain/usecases/transaction/transaction.find-paginated-of-user.usecase';
import { TransactionCreateByCancelUseCase } from 'src/domain/usecases/transaction/transaction.create-by-cancell.usecase';

@Module({
  providers: [
    TransactionCreateByTransferUseCase,
    TransactionFindPaginatedOfUserUseCase,
    TransactionCreateByCancelUseCase,
  ],
  exports: [
    TransactionCreateByTransferUseCase,
    TransactionFindPaginatedOfUserUseCase,
    TransactionCreateByCancelUseCase,
  ],
})
export class TransactionUseCaseModule {}
