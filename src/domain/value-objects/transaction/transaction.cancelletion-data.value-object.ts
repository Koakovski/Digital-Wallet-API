export type TransactionCancellationDataValueObjectProps = {
  transactionId: string;
  cancelledAt: Date;
};

export class TransactionCancellationDataValueObject {
  private constructor(
    private readonly props: TransactionCancellationDataValueObjectProps,
  ) {}

  get transactionId() {
    return this.props.transactionId;
  }

  get cancelledAt() {
    return this.props.cancelledAt;
  }

  static recover(props: TransactionCancellationDataValueObjectProps) {
    return new TransactionCancellationDataValueObject(props);
  }
}
