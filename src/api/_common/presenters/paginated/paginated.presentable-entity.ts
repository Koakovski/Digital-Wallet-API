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
