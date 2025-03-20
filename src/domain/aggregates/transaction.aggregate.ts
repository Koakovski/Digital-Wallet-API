import { TransactionEntity } from '../entities/transaction.entity';
import { UserEntity } from '../entities/user.entity';

export type TransactionAggregateProps = {
  transaction: TransactionEntity;
  sender: UserEntity;
  receiver: UserEntity;
};

export type TransactionAggregateNewByTransferProps = {
  sender: UserEntity;
  receiver: UserEntity;
  valueInCents: number;
};

export class TransactionAggregate {
  private constructor(private readonly props: TransactionAggregateProps) {}

  get root() {
    return this.props.transaction;
  }

  get sender() {
    return this.props.sender;
  }

  get receiver() {
    return this.props.receiver;
  }

  static newByTransfer(props: TransactionAggregateNewByTransferProps) {
    props.sender.removeBalance(props.valueInCents);
    props.receiver.addBalance(props.valueInCents);

    const transaction = TransactionEntity.new({
      receiverId: props.receiver.id,
      senderId: props.sender.id,
      valueInCents: props.valueInCents,
    });

    return new TransactionAggregate({
      sender: props.sender,
      receiver: props.receiver,
      transaction,
    });
  }

  static recover(props: TransactionAggregateProps) {
    return new TransactionAggregate(props);
  }
}
