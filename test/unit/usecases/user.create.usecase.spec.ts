import { faker } from '@faker-js/faker';
import { UserEntity } from 'src/domain/entities/user.entity';
import { UserEmailAlreadyExistsException } from 'src/domain/exceptions/user/user.email-already-exitst.exception';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { HashService } from 'src/domain/services/hash.service';
import {
  UserCreateUseCase,
  UserCreateUseCaseParams,
} from 'src/domain/usecases/user/user.create.usecase';
import { userEntityMockFactory } from 'test/mocks/entities/user.entity.mock';
import { UserRepositoryMock } from 'test/mocks/repositories/user.repository.mock';
import { HashServiceMock } from 'test/mocks/services/hash.service.mock';
import { vi } from 'vitest';

describe('UserCreateUseCase', () => {
  let sut: UserCreateUseCase;
  let userRepository: UserRepository;
  let hashService: HashService;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    hashService = new HashServiceMock();

    const { userFindByEmailSpy } = UserRepositoryMock.getSpies(userRepository);
    userFindByEmailSpy.mockResolvedValue(null);

    sut = new UserCreateUseCase(userRepository, hashService);
  });

  describe('execute', () => {
    function createParams(): UserCreateUseCaseParams {
      return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.lorem.word(),
      };
    }

    describe('verifyUniqueEmail', () => {
      it('should call findByEmail method of UserRepository with correct params', async () => {
        const { userFindByEmailSpy } =
          UserRepositoryMock.getSpies(userRepository);

        const params = createParams();
        await sut.execute(params);

        expect(userFindByEmailSpy).toHaveBeenCalledWith(params.email);
      });

      it('should throw if User with same email was found', async () => {
        const { userFindByEmailSpy } =
          UserRepositoryMock.getSpies(userRepository);
        userFindByEmailSpy.mockResolvedValueOnce(userEntityMockFactory.build());

        const params = createParams();
        const promise = sut.execute(params);

        await expect(promise).rejects.toBeBaseException(
          UserEmailAlreadyExistsException,
        );
      });
    });

    it('should call hash method of HashService with correct params', async () => {
      const { hashServiceHashSpy } = HashServiceMock.getSpies(hashService);

      const params = createParams();
      await sut.execute(params);

      expect(hashServiceHashSpy).toHaveBeenCalledWith(params.password);
    });

    it('should call new method of UserEntity with correct params', async () => {
      const { hashServiceHashSpy } = HashServiceMock.getSpies(hashService);
      const hashedPassword = 'hashed_password';
      hashServiceHashSpy.mockResolvedValueOnce(hashedPassword);

      const userEntityNewSpy = vi.spyOn(UserEntity, 'new');

      const params = createParams();
      await sut.execute(params);

      expect(userEntityNewSpy).toHaveBeenCalledWith({
        name: params.name,
        email: params.email,
        password: hashedPassword,
      });
    });

    it('should call created method of UserRepository with correct new UserEntity', async () => {
      const { userCreateSpy } = UserRepositoryMock.getSpies(userRepository);

      const newUser = userEntityMockFactory.build();
      const userEntityNewSpy = vi.spyOn(UserEntity, 'new');
      userEntityNewSpy.mockReturnValueOnce(newUser);

      const params = createParams();
      await sut.execute(params);

      expect(userCreateSpy).toHaveBeenCalledWith(newUser);
    });

    it('should return the created UserEntity', async () => {
      const { userCreateSpy } = UserRepositoryMock.getSpies(userRepository);

      const newUser = userEntityMockFactory.build();
      userCreateSpy.mockResolvedValueOnce(newUser);

      const params = createParams();
      const result = await sut.execute(params);

      expect(result).toBe(newUser);
    });
  });
});
