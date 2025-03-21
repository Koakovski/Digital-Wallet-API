import { Inject } from '@nestjs/common';
import { TransactionAggregate } from 'src/domain/aggregates/transaction.aggregate';
import { Paginated, PaginationRequest } from 'src/domain/base/paginated';
import { UseCase } from 'src/domain/base/usecase';
import { TransactionUserRole } from 'src/domain/entities/transaction.entity';
import { TransactionAggregateRepository } from 'src/domain/repositories/transaction.aggregate.repository';

export class TransactionFindPaginatedOfUserUseCase
  implements
    UseCase<
      TransactionFindPaginatedOfUserUseCaseParams,
      Paginated<TransactionAggregate>
    >
{
  constructor(
    @Inject(TransactionAggregateRepository)
    private readonly transactionAggregateRepository: TransactionAggregateRepository,
  ) {}

  async execute(
    params: TransactionFindPaginatedOfUserUseCaseParams,
  ): Promise<Paginated<TransactionAggregate>> {
    return await this.transactionAggregateRepository.findPaginatedOfUser({
      userId: params.userId,
      role: params.role,
      receiverIds: params.receiverIds,
      paginationRequest: params.paginationRequest,
    });
  }
}

export type TransactionFindPaginatedOfUserUseCaseParams = {
  userId: string;
  role?: TransactionUserRole;
  receiverIds?: string[];
  paginationRequest?: PaginationRequest;
};
