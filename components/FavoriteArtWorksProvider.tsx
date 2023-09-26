import React from 'react';
import {FavoriteArtWorksContext} from '../context/FavoriteArtWorksContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAVORITE_ART_WORKS_STORAGE_KEY} from '../constants';

export const FavoriteArtWorksProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favorites, setFavorites] = React.useState(new Set<number>());
  React.useLayoutEffect(() => {
    AsyncStorage.getItem(FAVORITE_ART_WORKS_STORAGE_KEY).then(data => {
      data = JSON.parse(data ?? '');
      if (Array.isArray(data)) {
        setFavorites(new Set(data));
      }
    });
  }, []);

  return (
    <FavoriteArtWorksContext.Provider
      value={{
        isFavorite: id => favorites.has(id),
        toggleFavorite: id => {
          const favoritesArr = [...favorites];
          if (favorites.has(id)) {
            favoritesArr.splice(favoritesArr.indexOf(id), 1);
          } else {
            favoritesArr.push(id);
          }
          setFavorites(new Set(favoritesArr));
          return AsyncStorage.setItem(
            FAVORITE_ART_WORKS_STORAGE_KEY,
            JSON.stringify(favoritesArr),
          );
        },
      }}>
      {children}
    </FavoriteArtWorksContext.Provider>
  );
};
