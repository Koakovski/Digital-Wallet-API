import { TransactionEntity } from '../entities/transaction.entity';
import { PermissionMap } from './permission.type';

export type ResourcePermissions = {
  transaction: {
    dataType: TransactionEntity;
    actions: 'update';
  };
};

export const RESOURCE_PERMISSIONS: Readonly<PermissionMap> = {
  transaction: {
    update: (user, transaction) => user.id === transaction.senderId,
  },
};
