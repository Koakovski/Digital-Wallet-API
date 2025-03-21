export type TransactionCancellationDataValueObjectProps = {
  cancellationTransactionId: string;
  cancelledAt: Date;
};

export class TransactionCancellationDataValueObject {
  private constructor(
    private readonly props: TransactionCancellationDataValueObjectProps,
  ) {}

  get cancellationTransactionId() {
    return this.props.cancellationTransactionId;
  }

  get cancelledAt() {
    return this.props.cancelledAt;
  }

  static recover(props: TransactionCancellationDataValueObjectProps) {
    return new TransactionCancellationDataValueObject(props);
  }
}
