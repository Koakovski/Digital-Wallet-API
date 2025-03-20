import {
  TransactionEntity,
  TransactionUserRole,
} from '../entities/transaction.entity';

export interface TransactionRepository {
  findAllOfUser(
    params: TransactionFindAllOfUserParams,
  ): Promise<TransactionEntity[]>;
}

export const TransactionRepository = Symbol('TransactionRepository');

export type TransactionFindAllOfUserParams = {
  userId: string;
  as?: TransactionUserRole;
};
