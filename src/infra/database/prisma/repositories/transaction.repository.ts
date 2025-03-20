import { Injectable } from '@nestjs/common';
import {
  TransactionFindAllOfUserParams,
  TransactionRepository,
} from 'src/domain/repositories/transaction.repository';
import { PrismaService } from '../prisma.service';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { Prisma } from '@prisma/client';
import { PrismaTransactionMapper } from '../mappers/prisma.transaction.mapper';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllOfUser(
    params: TransactionFindAllOfUserParams,
  ): Promise<TransactionEntity[]> {
    const where: Prisma.TransactionWhereInput[] = [];

    switch (params.as) {
      case 'receiver':
        where.push({
          receiverId: params.userId,
        });
        break;
      case 'sender':
        where.push({
          senderId: params.userId,
        });
        break;
      case undefined:
        where.push({
          OR: [{ receiverId: params.userId }, { senderId: params.userId }],
        });
        break;
    }

    const prismaTransactions = await this.prismaService.transaction.findMany({
      where: {
        AND: where,
      },
    });

    return prismaTransactions.map((transaction) =>
      PrismaTransactionMapper.toDomain(transaction),
    );
  }
}
