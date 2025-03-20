import { Transaction } from '@prisma/client';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';

export class PrismaTransactionMapper {
  static toDomain(data: Transaction): TransactionEntity {
    return TransactionEntity.recover(
      {
        senderId: data.senderId,
        receiverId: data.receiverId,
        valueInCents: data.valueInCents,
        createdAt: data.createdAt,
      },
      data.id,
    );
  }

  static toPersistence(data: TransactionEntity): Transaction {
    return {
      id: data.id,
      senderId: data.senderId,
      receiverId: data.receiverId,
      valueInCents: data.valueInCents,
      createdAt: data.createdAt,
    };
  }
}
