import { Inject, Injectable } from '@nestjs/common';
import { TransactionAggregate } from 'src/domain/aggregates/transaction.aggregate';
import { TransactionAggregateRepository } from 'src/domain/repositories/transaction.aggregate.repository';
import { PermissionDataFetcher } from 'src/infra/permissions/permission.decorator';

@Injectable()
export class TransactionDataFetcher
  implements
    PermissionDataFetcher<TransactionDataFetcherParams, TransactionAggregate>
{
  constructor(
    @Inject(TransactionAggregateRepository)
    private readonly transactionRepository: TransactionAggregateRepository,
  ) {}

  async get(
    params: TransactionDataFetcherParams,
  ): Promise<TransactionAggregate | null> {
    return await this.transactionRepository.findById(params.transactionId);
  }
}

export type TransactionDataFetcherParams = {
  transactionId: string;
};
