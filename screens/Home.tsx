import React from 'react';
import {useChicagoArtWorks} from '../hooks/useChicagoArtWorks';
import {usePagination} from '../hooks/usePagination';
import {ArtWorksListTemplate} from '../components/ArtWorksListTemplate';

const Home = () => {
  const {page, setPage, limit, setLimit} = usePagination();
  const artworks = useChicagoArtWorks({currentPage: page, limit});
  return (
    <ArtWorksListTemplate
      artworks={artworks}
      onLimitChange={setLimit}
      onPageChange={setPage}
    />
  );
};

export default Home;
