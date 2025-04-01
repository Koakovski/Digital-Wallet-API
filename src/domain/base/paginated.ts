export class Paginated<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;

  constructor(data: T[], total: number, { page, perPage }: PaginationRequest) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.perPage = perPage;
    this.totalPages = Math.ceil(total / perPage);
  }
}

export class PaginationRequest {
  static MAX_PER_PAGE = 50;

  private _page: number;
  private _perPage: number;

  get page() {
    return this._page;
  }

  get perPage() {
    return this._perPage;
  }

  get skip() {
    return (this.page - 1) * this.perPage;
  }

  private set page(page: number) {
    this._page = Math.max(page, 1);
  }

  private set perPage(perPage: number) {
    this._perPage = Math.max(
      Math.min(perPage, PaginationRequest.MAX_PER_PAGE),
      1,
    );
  }

  constructor(page = 1, perPage = 10) {
    this.page = page;
    this.perPage = perPage;
  }
}
