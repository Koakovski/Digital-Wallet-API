import { ApiProperty } from '@nestjs/swagger';

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
    description: 'Date when the transaction was created',
  })
  created_at: Date;
}
