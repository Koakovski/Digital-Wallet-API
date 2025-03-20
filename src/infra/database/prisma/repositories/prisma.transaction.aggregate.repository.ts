import { Injectable } from '@nestjs/common';
import { TransactionAggregate } from 'src/domain/aggregates/transaction.aggregate';
import { TransactionAggregateRepository } from 'src/domain/repositories/transaction.aggregate.repository';
import { PrismaService } from '../prisma.service';
import { PrismaTransactionMapper } from '../mappers/prisma.transaction.mapper';
import { PrismaTransactionAggregateMapper } from '../mappers/prisma.transaction.aggregate.mapper';

@Injectable()
export class PrismaTransactionAggregateRepository
  implements TransactionAggregateRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(aggregate: TransactionAggregate): Promise<TransactionAggregate> {
    const prismaTransactionData = await this.prismaService.transaction.create({
      data: PrismaTransactionMapper.toPersistence(aggregate.root),
      include: {
        Sender: true,
        Receiver: true,
      },
    });

    return PrismaTransactionAggregateMapper.toDomain(prismaTransactionData);
  }
}
