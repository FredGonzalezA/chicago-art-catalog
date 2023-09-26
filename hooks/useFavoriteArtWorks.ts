import React from 'react';
import {FavoriteArtWorksContext} from '../context/FavoriteArtWorksContext';

export const useFavoriteArtWorks = () => {
  return React.useContext(FavoriteArtWorksContext);
};
