import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma.user.mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(entity: UserEntity): Promise<UserEntity> {
    const prismaUser = await this.prismaService.user.create({
      data: PrismaUserMapper.toPersistence(entity),
    });

    return PrismaUserMapper.toDomain(prismaUser);
  }
}
