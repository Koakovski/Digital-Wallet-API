import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './prisma/repositories/prisma.user.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
