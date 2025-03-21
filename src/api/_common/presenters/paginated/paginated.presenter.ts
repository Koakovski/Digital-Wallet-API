import { Paginated } from 'src/domain/base/paginated';
import { PaginatedPresentableEntity } from './paginated.presentable-entity';

export class PaginatedPresenter<T> {
  constructor(private readonly paginatedData: Paginated<T>) {}

  mapData<mappedT>(
    callback: (data: T) => mappedT,
  ): PaginatedPresentableEntity<mappedT> {
    return {
      data: this.paginatedData.data.map(callback),
      total: this.paginatedData.total,
      page: this.paginatedData.page,
      per_page: this.paginatedData.perPage,
      total_pages: this.paginatedData.totalPages,
    };
  }
}
