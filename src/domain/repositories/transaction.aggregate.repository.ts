import { TransactionAggregate } from '../aggregates/transaction.aggregate';

export interface TransactionAggregateRepository {
  create(aggregate: TransactionAggregate): Promise<TransactionAggregate>;
}

export const TransactionAggregateRepository = Symbol(
  'TransactionAggregateRepository',
);
