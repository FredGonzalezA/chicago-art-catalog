import React from 'react';
import {SafeAreaView, View, StyleSheet, StatusBar, Image} from 'react-native';
import {FullLoading} from '../components/FullLoading';
import {RootStackParamsList} from '../types/global';
import {useChicagoArtWork} from '../hooks/useChicagoArtWork';
import {getImageUrl} from '../utils/image';
import {AnimatedFAB, Chip, Text} from 'react-native-paper';
import {ScrollView} from 'react-native';
import {useFavoriteArtWorks} from '../hooks/useFavoriteArtWorks';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const SubTitle: React.FC<{children: string}> = ({children}) => (
  <Text variant="titleLarge" style={styles.subTitle}>
    {children}
  </Text>
);

const BodyText: React.FC<{children: string}> = ({children}) => (
  <Text variant="bodyLarge" style={styles.bodyText}>
    {children}
  </Text>
);

const Artwork = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamsList, 'ArtWork'>) => {
  const artworkId = String(route.params.id);
  const {data, isFetching} = useChicagoArtWork(artworkId);
  const [isExtended, setIsExtended] = React.useState(true);
  const {isFavorite: _isFavorite, toggleFavorite} = useFavoriteArtWorks();
  const isFavorite = _isFavorite(route.params.id);

  const artwork = data?.data;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => {
        if (!artwork?.color) {
          return null;
        }
        return (
          <View
            style={StyleSheet.compose(
              {
                backgroundColor: `hsl(${artwork.color.h}, ${artwork.color.s}%, ${artwork.color.l}%)`,
              },
              styles.colorDot,
            )}
          />
        );
      },
    });
  }, [navigation, route, artwork?.color]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={'hsl(322, 89%, 30%)'} />
      <View style={styles.content}>
        <ScrollView
          scrollEventThrottle={200}
          onScroll={({nativeEvent}) => {
            const currentScrollPosition =
              Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

            setIsExtended(currentScrollPosition <= 0);
          }}>
          <Image
            style={styles.image}
            source={{
              uri: route.params.imageId
                ? getImageUrl(route.params.imageId, '843')
                : undefined,
            }}
          />
          <View style={styles.textContentWrapper}>
            <Text variant="headlineSmall" style={styles.title}>
              {route.params.title}{' '}
            </Text>
            {artwork && (
              <Text variant="labelSmall" style={styles.artistDisplay}>
                {artwork.artistDisplay}
              </Text>
            )}
            <View style={styles.space} />
            {artwork && (
              <View style={styles.chipsWrapper}>
                {[
                  {value: artwork.isPublicDomain, label: 'Public'},
                  {value: artwork.hasAdvancedImaging, label: '3D'},
                  {
                    value: artwork.hasEducationalResources,
                    label: 'Educational',
                  },
                  {value: artwork.hasMultimediaResources, label: 'Multimedia'},
                ]
                  .filter(i => !!i.value)
                  .map(({label}) => (
                    <Chip icon="check" key={label} style={styles.chip}>
                      {label}
                    </Chip>
                  ))}
              </View>
            )}
            {route.params.description && (
              <BodyText>{route.params.description}</BodyText>
            )}
            {artwork &&
              [
                {label: 'Origin', value: artwork.placeOfOrigin},
                {label: 'Materials used', value: artwork.mediumDisplay},
                {label: 'Exhibition places', value: artwork.exhibitionHistory},
                {label: 'Copyright', value: artwork.copyrightNotice},
              ].map(({label, value}) => {
                if (!value) {
                  return null;
                }
                return (
                  <React.Fragment key={label}>
                    <SubTitle>{label}</SubTitle>
                    <BodyText>{value}</BodyText>
                  </React.Fragment>
                );
              })}
          </View>
        </ScrollView>
      </View>
      <AnimatedFAB
        icon={isFavorite ? 'heart' : 'heart-outline'}
        label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        extended={isExtended}
        onPress={() => toggleFavorite(route.params.id)}
        style={styles.fab}
      />
      <FullLoading show={isFetching} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  image: {
    height: 400,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  bodyText: {textAlign: 'justify', marginBottom: 16},
  subTitle: {fontWeight: '500', marginBottom: 16},
  chipsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {marginRight: 8},
  space: {height: 16},
  textContentWrapper: {padding: 16},
  title: {fontWeight: '500'},
  artistDisplay: {textAlign: 'justify'},
});

export default Artwork;
