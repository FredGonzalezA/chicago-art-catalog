import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HomeParams = {};

export type RootStackParamsList = {
  Home: HomeParams;
};

export type ScreenProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;
