import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  create(entity: UserEntity): Promise<UserEntity>;
}

export const UserRepository = Symbol('UserRepository');
