import { TransactionPresentableEntity } from '../transaction.presentable-entity';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionAggregateUserPresentableEntity {
  @ApiProperty({
    description: 'Unique identifier of the user',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'johndoe@example.com',
  })
  email: string;
}

export class TransactionAggregatePresentableEntity extends TransactionPresentableEntity {
  @ApiProperty({
    description: 'Information about the user who sent the transaction',
    type: () => TransactionAggregateUserPresentableEntity,
  })
  sender: TransactionAggregateUserPresentableEntity;

  @ApiProperty({
    description: 'Information about the user who received the transaction',
    type: () => TransactionAggregateUserPresentableEntity,
  })
  receiver: TransactionAggregateUserPresentableEntity;
}
