import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { TransactionPresentableEntity } from './transaction.presentable-entity';

export class TransactionPresenter {
  constructor(private readonly transaction: TransactionEntity) {}

  toPresent(): TransactionPresentableEntity {
    return {
      id: this.transaction.id,
      sender_id: this.transaction.senderId,
      receiver_id: this.transaction.receiverId,
      value_in_cents: this.transaction.valueInCents,
      created_at: this.transaction.createdAt,
    };
  }
}
