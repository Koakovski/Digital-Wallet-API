import { Entity } from '../base/entity';
import { TransactionCancellationTransactionDataValueObject } from '../value-objects/transaction/transaction.cancelletion-transaction-data.value-object';

export type TransactionEntityProps = {
  senderId: string;
  receiverId: string;
  valueInCents: number;
  cancelleationTransactionData: TransactionCancellationTransactionDataValueObject | null;
  createdAt: Date;
};

export type TransactionEntityNewProps = {
  senderId: string;
  receiverId: string;
  valueInCents: number;
};

export enum TransactionUserRole {
  SENDER = 'SENDER',
  RECEIVER = 'RECEIVER',
}

export class TransactionEntity extends Entity<TransactionEntityProps> {
  get senderId() {
    return this.props.senderId;
  }

  get receiverId() {
    return this.props.receiverId;
  }

  get valueInCents() {
    return this.props.valueInCents;
  }

  get cancelleationTransactionData() {
    return this.props.cancelleationTransactionData;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static new(props: TransactionEntityNewProps) {
    return TransactionEntity.create({
      senderId: props.senderId,
      receiverId: props.receiverId,
      valueInCents: props.valueInCents,
      cancelleationTransactionData: null,
      createdAt: new Date(),
    });
  }

  static recover(props: TransactionEntityProps, id: string) {
    return TransactionEntity.create(props, id);
  }

  private static create(props: TransactionEntityProps, id?: string) {
    return new TransactionEntity(props, id);
  }
}
