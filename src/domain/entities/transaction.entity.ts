import { Entity } from '../base/entity';

export type TransactionEntityProps = {
  senderId: string;
  receiverId: string;
  valueInCents: number;
  createdAt: Date;
};

export type TransactionEntityNewProps = {
  senderId: string;
  receiverId: string;
  valueInCents: number;
};

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

  static new(props: TransactionEntityNewProps) {
    return TransactionEntity.create({
      senderId: props.senderId,
      receiverId: props.receiverId,
      valueInCents: props.valueInCents,
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
