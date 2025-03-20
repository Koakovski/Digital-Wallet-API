import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './prisma/repositories/prisma.user.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaService } from './prisma/prisma.service';
import { TransactionAggregateRepository } from 'src/domain/repositories/transaction.aggregate.repository';
import { PrismaTransactionAggregateRepository } from './prisma/repositories/prisma.transaction.aggregate.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: TransactionAggregateRepository,
      useClass: PrismaTransactionAggregateRepository,
    },
  ],
  exports: [UserRepository, TransactionAggregateRepository],
})
export class DatabaseModule {}
