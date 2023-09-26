import React from 'react';

export type IFavoriteArtWorksContext = {
  favorites: Set<number>;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => Promise<void>;
};

export const FavoriteArtWorksContext =
  React.createContext<IFavoriteArtWorksContext>({
    favorites: new Set(),
    isFavorite: () => false,
    toggleFavorite: () => Promise.resolve(),
  });
