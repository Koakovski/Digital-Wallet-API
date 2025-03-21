import { InternalServerErrorException } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { TransactionCancellationDataValueObject } from 'src/domain/value-objects/transaction/transaction.cancelletion-data.value-object';

export class PrismaTransactionMapper {
  static toDomain(data: Transaction): TransactionEntity {
    const cancelleationData = this.recoverCancellationData(data);

    return TransactionEntity.recover(
      {
        senderId: data.senderId,
        receiverId: data.receiverId,
        valueInCents: data.valueInCents,
        cancelleationData,
        createdAt: data.createdAt,
      },
      data.id,
    );
  }

  static toPersistence(data: TransactionEntity): Transaction {
    const cancellationTransactionId =
      data.cancelleationData?.cancellationTransactionId ?? null;
    const cancelledAt = data.cancelleationData?.cancelledAt ?? null;

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

  private static recoverCancellationData(data: Transaction) {
    if (!data.cancellationTransactionId && !data.cancelledAt) return null;

    if (data.cancellationTransactionId && data.cancelledAt) {
      return TransactionCancellationDataValueObject.recover({
        cancellationTransactionId: data.cancellationTransactionId,
        cancelledAt: data.cancelledAt,
      });
    }

    throw new InternalServerErrorException(
      `Transaction with id ${data.id} has incrongruent cancelletion data`,
    );
  }
}
