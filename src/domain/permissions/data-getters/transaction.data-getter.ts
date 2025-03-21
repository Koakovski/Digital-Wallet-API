import { Inject, Injectable } from '@nestjs/common';
import { TransactionAggregate } from 'src/domain/aggregates/transaction.aggregate';
import { TransactionAggregateRepository } from 'src/domain/repositories/transaction.aggregate.repository';
import { PermissionDataGetter } from 'src/infra/permissions/permission.decorator';

@Injectable()
export class TransactionDataGetter
  implements
    PermissionDataGetter<TransactionDataGetterParams, TransactionAggregate>
{
  constructor(
    @Inject(TransactionAggregateRepository)
    private readonly transactionRepository: TransactionAggregateRepository,
  ) {}

  async get(
    params: TransactionDataGetterParams,
  ): Promise<TransactionAggregate | null> {
    return await this.transactionRepository.findById(params.transactionId);
  }
}

export type TransactionDataGetterParams = {
  transactionId: string;
};
