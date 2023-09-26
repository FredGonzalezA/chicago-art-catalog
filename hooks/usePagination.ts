import React from 'react';
import {Pagination} from '../types/global';

export const usePagination = ({
  page: _page = 1,
  limit: _limit = 10,
}: Partial<{
  page: Pagination['currentPage'];
  limit: Pagination['limit'];
}> = {}) => {
  const [page, setPage] = React.useState(_page);
  const [limit, setLimit] = React.useState(_limit);
  return {page, limit, setPage, setLimit};
};
