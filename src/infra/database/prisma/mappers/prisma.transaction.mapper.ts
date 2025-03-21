import { InternalServerErrorException } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { TransactionCancellationTransactionDataValueObject } from 'src/domain/value-objects/transaction/transaction.cancelletion-transaction-data.value-object';

export class PrismaTransactionMapper {
  static toDomain(data: Transaction): TransactionEntity {
    const cancelleationTransactionData =
      this.recoverCancelleationTransactionData(data);

    return TransactionEntity.recover(
      {
        senderId: data.senderId,
        receiverId: data.receiverId,
        valueInCents: data.valueInCents,
        cancelleationTransactionData,
        createdAt: data.createdAt,
      },
      data.id,
    );
  }

  static toPersistence(data: TransactionEntity): Transaction {
    const cancellationTransactionId =
      data.cancelleationTransactionData?.cancellationTransactionId ?? null;
    const cancelledAt = data.cancelleationTransactionData?.cancelledAt ?? null;

    return {
      id: data.id,
      senderId: data.senderId,
      receiverId: data.receiverId,
      valueInCents: data.valueInCents,
      cancellationTransactionId,
      cancelledAt,
      createdAt: data.createdAt,
    };
  }

  private static recoverCancelleationTransactionData(data: Transaction) {
    if (!data.cancellationTransactionId && !data.cancelledAt) return null;

    if (data.cancellationTransactionId && data.cancelledAt) {
      return TransactionCancellationTransactionDataValueObject.recover({
        cancellationTransactionId: data.cancellationTransactionId,
        cancelledAt: data.cancelledAt,
      });
    }

    throw new InternalServerErrorException(
      `Transaction with id ${data.id} has incrongruent cancelletion data`,
    );
  }
}
