import {
  UserEntity,
  UserEntityNewProps,
  UserEntityProps,
} from 'src/domain/entities/user.entity';
import { faker } from '@faker-js/faker';
import { InsufficientBalanceException } from 'src/domain/exceptions/user/user.insufficient-balance.exception';

describe('UserEntity', () => {
  function createEntity(props: Partial<UserEntityProps>): UserEntity {
    return UserEntity.recover(
      {
        ...createProps(),
        ...props,
      },
      faker.string.uuid(),
    );
  }

  function createProps(): UserEntityProps {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.lorem.word(),
      balanceInCents: 0,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
  }

  describe('new', () => {
    function createNewProps(): UserEntityNewProps {
      return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.lorem.word(),
      };
    }

    it('should correct create a new UserEntity', () => {
      const props = createNewProps();
      const sut = UserEntity.new(props);

      expect(sut).toBeInstanceOf(UserEntity);
      expect(sut.name).toEqual(props.name);
      expect(sut.email).toEqual(props.email);
      expect(sut.password).toEqual(props.password);
      expect(sut.balanceInCents).toEqual(10000);
    });
  });

  describe('addBalance', () => {
    it('should correct increase the balance of User', () => {
      const sut = createEntity({
        balanceInCents: 10,
      });

      sut.addBalance(10);

      expect(sut.balanceInCents).toEqual(20);
    });
  });

  describe('removeBalance', () => {
    it('should correct decrease the balance of User', () => {
      const sut = createEntity({
        balanceInCents: 10,
      });

      sut.removeBalance(10);

      expect(sut.balanceInCents).toEqual(0);
    });

    it('should throw if value to be removed is greahter than the current balance of User', () => {
      const sut = createEntity({
        balanceInCents: 10,
      });

      expect(() => sut.removeBalance(11)).toThrowBaseException(
        InsufficientBalanceException,
        `User with id ${sut.id} do not have enough ance to complete the transaction`,
      );
    });
  });
});
