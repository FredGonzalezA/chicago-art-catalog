import React from 'react';
import {SafeAreaView, FlatList, View, StyleSheet} from 'react-native';
import {ArtItem} from './ArtItem';
import {DataTable, Surface} from 'react-native-paper';
import {FullLoading} from './FullLoading';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import type {ArtWork, Pagination, RootStackParamsList} from '../types/global';

const ItemSeparator = () => {
  return <View style={styles.itemSeparatorView} />;
};

export const ArtWorksListTemplate: React.FC<{
  artworks: {
    data?: {data: ArtWork[]; pagination: Pagination};
    isFetching: boolean;
  };
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
}> = ({artworks, onLimitChange, onPageChange}) => {
  const listRef = React.useRef<FlatList<ArtWork>>(null);
  const navigation =
    useNavigation<NativeStackScreenProps<RootStackParamsList>['navigation']>();

  React.useEffect(() => {
    listRef.current?.scrollToOffset({offset: 0});
  }, [artworks.data?.pagination.currentPage]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.content}>
        {artworks.data && Array.isArray(artworks.data.data) && (
          <>
            <FlatList
              ref={listRef}
              data={artworks.data.data}
              ItemSeparatorComponent={ItemSeparator}
              renderItem={({item}) => (
                <ArtItem
                  item={item}
                  onPress={() => {
                    navigation.push('ArtWork', item);
                  }}
                />
              )}
              keyExtractor={item => String(item.id)}
              style={styles.artworksList}
              contentContainerStyle={styles.artworksListContainer}
            />
            {artworks.data.pagination && (
              <Surface style={styles.paginationWrapper}>
                <DataTable.Pagination
                  style={styles.pagination}
                  page={artworks.data.pagination.currentPage - 1}
                  numberOfPages={artworks.data.pagination.totalPages}
                  label={`${
                    (artworks.data.pagination.currentPage - 1) *
                      artworks.data.pagination.limit +
                    1
                  }-${Math.min(
                    artworks.data.pagination.currentPage *
                      artworks.data.pagination.limit,
                    artworks.data.pagination.total,
                  )} of ${artworks.data.pagination.total}`}
                  showFastPaginationControls
                  numberOfItemsPerPageList={[10, 20, 30, 40, 50]}
                  numberOfItemsPerPage={artworks.data.pagination.limit}
                  onPageChange={page => onPageChange(page + 1)}
                  onItemsPerPageChange={onLimitChange}
                  selectPageDropdownLabel={'Rows per page'}
                />
              </Surface>
            )}
          </>
        )}
      </View>
      <FullLoading show={artworks.isFetching} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemSeparatorView: {
    height: 16,
  },
  content: {
    flex: 1,
  },
  artworksList: {
    flex: 1,
  },
  artworksListContainer: {
    padding: 16,
  },
  pagination: {
    justifyContent: 'center',
  },
  paginationWrapper: {},
  safeAreaView: {
    flex: 1,
  },
});
