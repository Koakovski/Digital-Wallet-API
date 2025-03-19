import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  create(entity: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
}

export const UserRepository = Symbol('UserRepository');
