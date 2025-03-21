import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';
import { PaginationRequest } from 'src/domain/base/paginated';

export class PaginationRequestQueryDto {
  @ApiProperty({
    description: 'The page number',
    example: 1,
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  page?: string;

  @ApiProperty({
    description: 'The number of items per page',
    example: 10,
    maximum: PaginationRequest.MAX_PER_PAGE,
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  per_page?: string;
}
