import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  create(entity: UserEntity): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}

export const UserRepository = Symbol('UserRepository');
