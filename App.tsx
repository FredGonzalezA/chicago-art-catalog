/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {IconButton, PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from './types/global';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ArtWorkScreen, HomeScreen, FavoritesScreen} from './screens';
import {FavoriteArtWorksProvider} from './components/FavoriteArtWorksProvider';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteArtWorksProvider>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={(
                  props: NativeStackScreenProps<RootStackParamsList, 'Home'>,
                ) => ({
                  // eslint-disable-next-line react/no-unstable-nested-components
                  headerRight: () => {
                    return (
                      <IconButton
                        size={20}
                        icon={'heart'}
                        onPress={() => {
                          props.navigation.push('Favorites', {});
                        }}
                      />
                    );
                  },
                })}
              />
              <Stack.Screen name="ArtWork" component={ArtWorkScreen} />
              <Stack.Screen name="Favorites" component={FavoritesScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </FavoriteArtWorksProvider>
    </QueryClientProvider>
  );
}

export default App;
