import React from 'react';
import {useChicagoArtWorks} from '../hooks/useChicagoArtWorks';
import {usePagination} from '../hooks/usePagination';
import {useFavoriteArtWorks} from '../hooks/useFavoriteArtWorks';
import {ArtWorksListTemplate} from '../components/ArtWorksListTemplate';

const Favorites = () => {
  const {page, setPage, limit, setLimit} = usePagination();
  const {favorites: _favorites} = useFavoriteArtWorks();
  const targetIds = React.useMemo(() => {
    return [..._favorites].slice((page - 1) * limit, page * limit);
  }, [page, limit, _favorites]);

  const artworks = useChicagoArtWorks({
    currentPage: page,
    limit,
    ids: targetIds,
  });
  return (
    <ArtWorksListTemplate
      artworks={{
        ...artworks,
        data: artworks.data
          ? {
              ...artworks.data,
              pagination: {
                currentPage: page,
                limit,
                total: _favorites.size,
                totalPages: Math.ceil(_favorites.size / limit),
                nextUrl: '',
                prevUrl: '',
              },
            }
          : undefined,
      }}
      onLimitChange={setLimit}
      onPageChange={setPage}
    />
  );
};

export default Favorites;
