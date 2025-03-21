import { Inject, Injectable } from '@nestjs/common';
import { TransactionAggregate } from 'src/domain/aggregates/transaction.aggregate';
import { UseCase } from 'src/domain/base/usecase';
import { TransactionNotFoundException } from 'src/domain/exceptions/transaction/transaction.not-found.exception';
import { TransactionAggregateRepository } from 'src/domain/repositories/transaction.aggregate.repository';

@Injectable()
export class TransactionCreateByCancelUseCase
  implements
    UseCase<TransactionCreateByCancelUseCaseParams, TransactionAggregate>
{
  constructor(
    @Inject(TransactionAggregateRepository)
    private readonly transactionRepository: TransactionAggregateRepository,
  ) {}

  async execute(
    params: TransactionCreateByCancelUseCaseParams,
  ): Promise<TransactionAggregate> {
    const transaction = await this.fetchTransaction(params);

    transaction.cancel();

    return await this.transactionRepository.update(transaction);
  }

  private async fetchTransaction(
    params: TransactionCreateByCancelUseCaseParams,
  ) {
    const transaction = await this.transactionRepository.findById(
      params.transactionId,
    );
    if (!transaction) {
      throw new TransactionNotFoundException();
    }

    return transaction;
  }
}

export type TransactionCreateByCancelUseCaseParams = {
  transactionId: string;
};
