import { Injectable } from '@nestjs/common';
import { TransactionAggregate } from 'src/domain/aggregates/transaction.aggregate';
import {
  TransactionAggregateFindPaginatedOfUserParams,
  TransactionAggregateRepository,
} from 'src/domain/repositories/transaction.aggregate.repository';
import { PrismaService } from '../prisma.service';
import { PrismaTransactionMapper } from '../mappers/prisma.transaction.mapper';
import { PrismaTransactionAggregateMapper } from '../mappers/prisma.transaction.aggregate.mapper';
import { PrismaUserMapper } from '../mappers/prisma.user.mapper';
import { Paginated, PaginationRequest } from 'src/domain/base/paginated';
import { Prisma } from '@prisma/client';
import { TransactionUserRole } from 'src/domain/entities/transaction.entity';

@Injectable()
export class PrismaTransactionAggregateRepository
  implements TransactionAggregateRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(aggregate: TransactionAggregate): Promise<TransactionAggregate> {
    const prismaTransaction = await this.prismaService.$transaction(
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

    return PrismaTransactionAggregateMapper.toDomain(prismaTransaction);
  }

  async findPaginatedOfUser({
    userId,
    receiverIds,
    role,
    paginationRequest = new PaginationRequest(),
  }: TransactionAggregateFindPaginatedOfUserParams): Promise<
    Paginated<TransactionAggregate>
  > {
    const where: Prisma.TransactionWhereInput[] = [];

    where.push(this.parseRoleWhere(userId, role));

    if (receiverIds?.length) {
      where.push({
        receiverId: { in: receiverIds },
      });
    }

    const [prismaTransactions, total] = await this.prismaService.$transaction([
      this.prismaService.transaction.findMany({
        where: { AND: where },
        include: {
          Receiver: true,
          Sender: true,
        },
        skip: paginationRequest.skip,
        take: paginationRequest.perPage,
      }),
      this.prismaService.transaction.count({
        where: { AND: where },
      }),
    ]);

    const mappedTransactions = prismaTransactions.map((prismaTransaction) =>
      PrismaTransactionAggregateMapper.toDomain(prismaTransaction),
    );

    return new Paginated(mappedTransactions, total, paginationRequest);
  }

  private parseRoleWhere(
    userId: string,
    role?: TransactionUserRole,
  ): Prisma.TransactionWhereInput {
    if (!role) {
      return {
        OR: [
          {
            receiverId: userId,
          },
          {
            senderId: userId,
          },
        ],
      };
    }

    const roleFilters: Record<
      TransactionUserRole,
      Prisma.TransactionWhereInput
    > = {
      [TransactionUserRole.RECEIVER]: {
        receiverId: userId,
      },
      [TransactionUserRole.SENDER]: {
        senderId: userId,
      },
    };

    return roleFilters[role];
  }
}
