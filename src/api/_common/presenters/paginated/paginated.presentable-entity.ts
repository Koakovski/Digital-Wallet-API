import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedPresentableEntity<T> {
  @ApiProperty({
    description: 'List of items in the current page',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    description: 'Total number of items available',
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
  })
  per_page: number;

  @ApiProperty({
    description: 'Total number of pages',
  })
  total_pages: number;
}

export function PaginatedPresentabler<T>(
  classRef: Type<T>,
): Type<PaginatedPresentableEntity<T>> {
  class PaginatedResponse extends PaginatedPresentableEntity<T> {
    @ApiProperty({ type: () => [classRef], isArray: true })
    declare data: T[];
  }

  return PaginatedResponse;
}
