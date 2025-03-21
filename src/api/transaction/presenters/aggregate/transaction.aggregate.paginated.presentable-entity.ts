import { PaginatedPresentabler } from 'src/api/_common/presenters/paginated/paginated.presentable-entity';
import { TransactionAggregatePresentableEntity } from './transaction.aggregate.presentable-entity';

export class PaginatedTransactionAggregatePresentableEntity extends PaginatedPresentabler(
  TransactionAggregatePresentableEntity,
) {}
