import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type Base64String = string;
export type HTMLString = string;

export type HomeParams = {};

export type RootStackParamsList = {
  Home: HomeParams;
};

export type ScreenProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;

export type ArtWork = Partial<{
  thumbnail: {
    lqip?: Base64String;
  };
  title: string;
  description: HTMLString;
}>;
