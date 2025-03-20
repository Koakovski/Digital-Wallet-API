import { Injectable } from '@nestjs/common';
import { TransactionAggregate } from 'src/domain/aggregates/transaction.aggregate';
import { TransactionAggregateRepository } from 'src/domain/repositories/transaction.aggregate.repository';
import { PrismaService } from '../prisma.service';
import { PrismaTransactionMapper } from '../mappers/prisma.transaction.mapper';
import { PrismaTransactionAggregateMapper } from '../mappers/prisma.transaction.aggregate.mapper';
import { PrismaUserMapper } from '../mappers/prisma.user.mapper';

@Injectable()
export class PrismaTransactionAggregateRepository
  implements TransactionAggregateRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(aggregate: TransactionAggregate): Promise<TransactionAggregate> {
    const prismaTransactionData = await this.prismaService.$transaction(
      async (tx) => {
        await tx.user.update({
          where: {
            id: aggregate.sender.id,
          },
          data: PrismaUserMapper.toPersistence(aggregate.sender),
        });

        await tx.user.update({
          where: {
            id: aggregate.receiver.id,
          },
          data: PrismaUserMapper.toPersistence(aggregate.receiver),
        });

        return await tx.transaction.create({
          data: PrismaTransactionMapper.toPersistence(aggregate.root),
          include: {
            Sender: true,
            Receiver: true,
          },
        });
      },
    );

    return PrismaTransactionAggregateMapper.toDomain(prismaTransactionData);
  }
}
