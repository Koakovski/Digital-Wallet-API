import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';
import { UserEntity } from 'src/domain/entities/user.entity';

export const userEntityMockFactory = Factory.Sync.makeFactory<UserEntity>({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.lorem.word(),
  balanceInCents: 0,
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
  addBalance: () => undefined,
  removeBalance: () => undefined,
});
