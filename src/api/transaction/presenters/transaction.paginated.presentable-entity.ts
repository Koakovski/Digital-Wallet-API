import { PaginatedPresentabler } from 'src/api/_common/presenters/paginated/paginated.presentable-entity';
import { TransactionPresentableEntity } from './transaction.presentable-entity';

export class PaginatedTransactionPresentableEntity extends PaginatedPresentabler(
  TransactionPresentableEntity,
) {}
