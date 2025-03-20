import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './prisma/repositories/prisma.user.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaService } from './prisma/prisma.service';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { PrismaTransactionRepository } from './prisma/repositories/transaction.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
  exports: [UserRepository, TransactionRepository],
})
export class DatabaseModule {}
