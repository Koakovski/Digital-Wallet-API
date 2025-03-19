import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(entity: UserEntity): Promise<UserEntity>;
}
