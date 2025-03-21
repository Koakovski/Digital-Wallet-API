export type TransactionCancellationDataValueObjectProps = {
  transactionId: string;
  cancelledAt: Date;
};

export type TransactionCancellationDataValueObjectNewProps = {
  transactionId: string;
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

  static new(props: TransactionCancellationDataValueObjectNewProps) {
    return new TransactionCancellationDataValueObject({
      transactionId: props.transactionId,
      cancelledAt: new Date(),
    });
  }

  static recover(props: TransactionCancellationDataValueObjectProps) {
    return new TransactionCancellationDataValueObject(props);
  }
}
