import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsPositive, IsInt } from 'class-validator';

export class TransactionCreateByTransferDto {
  @ApiProperty({ description: 'UUID of the receiver user' })
  @IsUUID()
  receiver_id: string;

  @ApiProperty({ description: 'Transaction value in cents', example: 1000 })
  @IsInt()
  @IsPositive()
  value_in_cents: number;
}
