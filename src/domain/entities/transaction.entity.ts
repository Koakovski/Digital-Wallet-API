import { Entity } from '../base/entity';
import { TransactionAlreadyCancelledException } from '../exceptions/transaction/transaction.already-cancelled.exception';
import { TransactionCancellationDataValueObject } from '../value-objects/transaction/transaction.cancelletion-data.value-object';

export type TransactionEntityProps = {
  senderId: string;
  receiverId: string;
  valueInCents: number;
  cancellationData: TransactionCancellationDataValueObject | null;
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

  get cancellationData() {
    return this.props.cancellationData;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  cancel(transactionId: string) {
    if (this.props.cancellationData) {
      throw new TransactionAlreadyCancelledException();
    }

    this.props.cancellationData = TransactionCancellationDataValueObject.new({
      transactionId,
    });
  }

  static new(props: TransactionEntityNewProps) {
    return TransactionEntity.create({
      senderId: props.senderId,
      receiverId: props.receiverId,
      valueInCents: props.valueInCents,
      cancellationData: null,
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
