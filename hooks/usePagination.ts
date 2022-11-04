type Options = {
  page: number;
  totalCount: number;
  limit: number;
  displayCount?: number;
};

type Pagination = {
  previousPages: number[];
  currentPage: number;
  nextPages: number[];
  lastPage: number;
};

function generatePagesArray(from: number, to: number): number[] {
  const arr = [...new Array(to - from)];
  return arr.map((_, index) => from + index + 1).filter((page) => page > 0);
}

export function usePagination({
  page,
  totalCount,
  limit,
  displayCount = 1,
}: Options): Pagination {
  const currentPage = page;
  const lastPage = Math.floor(totalCount / limit);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - displayCount, currentPage - 1)
      : [];
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + displayCount, lastPage)
        )
      : [];

  return {
    lastPage,
    currentPage,
    previousPages,
    nextPages,
  };
}
