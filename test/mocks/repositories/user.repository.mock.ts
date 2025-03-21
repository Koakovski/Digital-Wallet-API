import { UserEntity } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { userEntityMockFactory } from '../entities/user.entity.mock';
import { vi } from 'vitest';

export class UserRepositoryMock implements UserRepository {
  create(): Promise<UserEntity> {
    return Promise.resolve(userEntityMockFactory.build());
  }

  findByEmail(): Promise<UserEntity | null> {
    return Promise.resolve(userEntityMockFactory.build());
  }

  findById(): Promise<UserEntity | null> {
    return Promise.resolve(userEntityMockFactory.build());
  }

  static getSpies(mock: UserRepository) {
    return {
      userCreateSpy: vi.spyOn(mock, 'create'),
      userFindByIdSpy: vi.spyOn(mock, 'findById'),
      userFindByEmailSpy: vi.spyOn(mock, 'findByEmail'),
    };
  }
}
