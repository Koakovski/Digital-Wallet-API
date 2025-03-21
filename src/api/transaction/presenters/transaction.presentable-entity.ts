import { ApiProperty } from '@nestjs/swagger';

export class TransactionCancellationDataPresentableEntity {
  @ApiProperty({
    description: 'UUID of the transaction being cancelled',
  })
  transaction_id: string;

  @ApiProperty({
    description: 'Date when the transaction was cancelled',
  })
  cancelled_at: Date;
}

export class TransactionPresentableEntity {
  @ApiProperty({
    description: 'Unique identifier of the transaction',
  })
  id: string;

  @ApiProperty({
    description: 'Identifier of user that send the transaction',
  })
  sender_id: string;

  @ApiProperty({
    description: 'Identifier of user that receive the transaction',
  })
  receiver_id: string;

  @ApiProperty({
    description: 'Value in cents of the transaction',
  })
  value_in_cents: number;

  @ApiProperty({
    description: 'Data related to the transaction cancellation',
    type: TransactionCancellationDataPresentableEntity,
    nullable: true,
  })
  cancellation_data: TransactionCancellationDataPresentableEntity | null;

  @ApiProperty({
    description: 'Date when the transaction was created',
  })
  created_at: Date;
}
