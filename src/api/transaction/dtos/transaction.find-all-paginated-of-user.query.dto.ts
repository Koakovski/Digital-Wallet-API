import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  ArrayNotEmpty,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { PaginationRequestQueryDto } from 'src/api/_common/dto/pagination-request.dto';
import { TransactionUserRole } from 'src/domain/entities/transaction.entity';

export class TransactionFindAllPaginatedOfUserQueryDto extends PaginationRequestQueryDto {
  @ApiProperty({
    description: 'List of receiver IDs',
    type: [String],
    required: false,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID(4, { each: true })
  @IsOptional()
  receiver_ids?: string[];

  @ApiProperty({
    description: 'The role of the user in the transaction',
    enum: TransactionUserRole,
    required: false,
  })
  @IsEnum(TransactionUserRole)
  @IsOptional()
  role?: TransactionUserRole;
}
