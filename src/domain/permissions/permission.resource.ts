import { TransactionAggregate } from '../aggregates/transaction.aggregate';
import { PermissionMap } from './permission.type';

export type ResourcePermissions = {
  transaction: {
    dataType: TransactionAggregate;
    actions: 'update';
  };
};

export const RESOURCE_PERMISSIONS: Readonly<PermissionMap> = {
  transaction: {
    update: (user, transaction) => user.id === transaction.root.senderId,
  },
};
