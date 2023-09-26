export type HTMLString = string;

export type ArtWork = {id: number; title: string} & Partial<{
  imageId: string;
  description: HTMLString;
}>;

export type ArtWorkDetails = Partial<{
  mediumDisplay: string;
  artistDisplay: string;
  placeOfOrigin: string;
  exhibitionHistory: string;
  isPublicDomain: boolean;
  copyrightNotice: string;
  hasAdvancedImaging: boolean;
  hasEducationalResources: boolean;
  hasMultimediaResources: boolean;
  color: {h: number; s: number; l: number};
}>;

export type Pagination = {
  currentPage: number;
  limit: number;
  nextUrl: string;
  prevUrl: string;
  total: number;
  totalPages: number;
};

export type HomeParams = {};
export type FavoritesParams = {};

export type ArtWorkParams = ArtWork;

export type RootStackParamsList = {
  Home: HomeParams;
  ArtWork: ArtWorkParams;
  Favorites: FavoritesParams;
};
