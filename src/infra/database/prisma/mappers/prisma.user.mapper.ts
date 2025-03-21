import { User } from '@prisma/client';
import { UserEntity } from 'src/domain/entities/user.entity';

export class PrismaUserMapper {
  static toDomain(data: User): UserEntity {
    return UserEntity.recover(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        balanceInCents: data.balanceInCents,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id,
    );
  }

  static toPersistence(data: UserEntity): User {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      balanceInCents: data.balanceInCents,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
