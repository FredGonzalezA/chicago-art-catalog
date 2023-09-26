import React from 'react';

export type IFavoriteArtWorksContext = {
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => Promise<void>;
};

export const FavoriteArtWorksContext =
  React.createContext<IFavoriteArtWorksContext>({
    isFavorite: () => false,
    toggleFavorite: () => Promise.resolve(),
  });
