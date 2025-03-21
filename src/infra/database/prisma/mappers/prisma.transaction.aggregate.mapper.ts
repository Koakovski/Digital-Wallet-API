import { Prisma } from '@prisma/client';
import { TransactionAggregate } from 'src/domain/aggregates/transaction.aggregate';
import { PrismaUserMapper } from './prisma.user.mapper';
import { PrismaTransactionMapper } from './prisma.transaction.mapper';

type PrismaTransactionData = Prisma.TransactionGetPayload<{
  include: {
    Receiver: true;
    Sender: true;
    CancellationTransaction: true;
  };
}>;

export class PrismaTransactionAggregateMapper {
  static toDomain(data: PrismaTransactionData): TransactionAggregate {
    const transaction = PrismaTransactionMapper.toDomain(data);
    const sender = PrismaUserMapper.toDomain(data.Sender);
    const receiver = PrismaUserMapper.toDomain(data.Receiver);
    const cancellTransaction = this.recoverCancellTransaction(data);

    return TransactionAggregate.recover({
      transaction,
      sender,
      receiver,
      cancellTransaction,
    });
  }

  private static recoverCancellTransaction(data: PrismaTransactionData) {
    if (!data.CancellationTransaction) return null;

    return PrismaTransactionMapper.toDomain(data.CancellationTransaction);
  }
}
