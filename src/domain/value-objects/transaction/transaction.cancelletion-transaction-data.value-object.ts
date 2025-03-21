export type TransactionCancellationTransactionDataValueObjectProps = {
  cancellationTransactionId: string;
  cancelledAt: Date;
};

export class TransactionCancellationTransactionDataValueObject {
  private constructor(
    private readonly props: TransactionCancellationTransactionDataValueObjectProps,
  ) {}

  get cancellationTransactionId() {
    return this.props.cancellationTransactionId;
  }

  get cancelledAt() {
    return this.props.cancelledAt;
  }

  static recover(
    props: TransactionCancellationTransactionDataValueObjectProps,
  ) {
    return new TransactionCancellationTransactionDataValueObject(props);
  }
}
