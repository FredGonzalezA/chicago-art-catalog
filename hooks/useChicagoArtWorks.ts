import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {ArtWork, Pagination} from '../types/global';
import {camelize} from '../utils/objects';
import sanitizeHtml from 'sanitize-html';

export const useChicagoArtWorks = ({
  ids,
  currentPage = 1,
  limit = 10,
}: Partial<
  Pick<Pagination, 'limit' | 'currentPage'> & {ids: number[]}
> = {}) => {
  const url = React.useMemo(
    () =>
      `https://api.artic.edu/api/v1/artworks?fields=id,title,description,image_id&page=${currentPage}&limit=${limit}${
        ids === undefined ? '' : '&ids=' + ids.join(',')
      }`,
    [currentPage, limit, ids],
  );

  return useQuery<{
    data: ArtWork[];
    pagination: Pagination;
  }>({
    queryKey: ['chicagoArtWorks', url],
    queryFn: () =>
      fetch(url)
        .then(res => res.json())
        .then(data => camelize(data))
        .then(data => {
          data.data.forEach((item: any) => {
            item.description = sanitizeHtml(item.description ?? '', {
              allowedTags: [],
            });
          });
          return data;
        }),
    keepPreviousData: true,
  });
};
