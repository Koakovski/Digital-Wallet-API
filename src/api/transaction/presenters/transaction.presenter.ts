import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import {
  TransactionCancellationDataPresentableEntity,
  TransactionPresentableEntity,
} from './transaction.presentable-entity';

export class TransactionPresenter {
  constructor(private readonly transaction: TransactionEntity) {}

  toPresent(): TransactionPresentableEntity {
    return {
      id: this.transaction.id,
      sender_id: this.transaction.senderId,
      receiver_id: this.transaction.receiverId,
      value_in_cents: this.transaction.valueInCents,
      cancellation_data: this.presentableCancellationData,
      created_at: this.transaction.createdAt,
    };
  }

  private get presentableCancellationData(): TransactionCancellationDataPresentableEntity | null {
    if (!this.transaction.cancellationData) return null;

    return {
      transaction_id: this.transaction.cancellationData.transactionId,
      cancelled_at: this.transaction.cancellationData.cancelledAt,
    };
  }
}
