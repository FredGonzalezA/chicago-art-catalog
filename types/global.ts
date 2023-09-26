import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HTMLString = string;

export type HomeParams = {};

export type RootStackParamsList = {
  Home: HomeParams;
};

export type ScreenProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;

export type ArtWork = {id: string; title: string} & Partial<{
  imageId: string;
  description: HTMLString;
}>;

export type Pagination = {
  currentPage: number;
  limit: number;
  nextUrl: string;
  prevUrl: string;
  total: number;
  totalPages: number;
};
