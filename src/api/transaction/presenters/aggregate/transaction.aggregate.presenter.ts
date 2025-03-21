import { TransactionAggregate } from 'src/domain/aggregates/transaction.aggregate';
import {
  TransactionAggregatePresentableEntity,
  TransactionAggregateUserPresentableEntity,
} from './transaction.aggregate.presentable-entity';
import { TransactionPresenter } from '../transaction.presenter';
import { UserEntity } from 'src/domain/entities/user.entity';

export class TransactionAggregatePresenter {
  constructor(private readonly transaction: TransactionAggregate) {}

  toPresent(): TransactionAggregatePresentableEntity {
    return {
      ...new TransactionPresenter(this.transaction.root).toPresent(),
      receiver: this.toPresentUser(this.transaction.receiver),
      sender: this.toPresentUser(this.transaction.sender),
    };
  }

  private toPresentUser(
    user: UserEntity,
  ): TransactionAggregateUserPresentableEntity {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
