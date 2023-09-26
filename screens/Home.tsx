import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import {ArtItem} from '../components/ArtItem';
import {useChicagoArtWorks} from '../hooks/useChicagoArtWorks';
import {DataTable, Surface} from 'react-native-paper';
import {usePagination} from '../hooks/usePagination';
import {FullLoading} from '../components/FullLoading';

const ItemSeparator = () => {
  return <View style={styles.itemSeparatorView} />;
};

const Home = () => {
  const {page, setPage, limit, setLimit} = usePagination();
  const artworks = useChicagoArtWorks({currentPage: page, limit});
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.content}>
        <StatusBar />
        {artworks.data && Array.isArray(artworks.data.data) && (
          <>
            <FlatList
              data={artworks.data.data}
              ItemSeparatorComponent={ItemSeparator}
              renderItem={({item}) => <ArtItem item={item} />}
              keyExtractor={item => item.id}
              style={styles.artworksList}
              contentContainerStyle={styles.artworksListContainer}
            />
            <Surface style={styles.paginationWrapper}>
              <DataTable.Pagination
                style={styles.pagination}
                page={artworks.data.pagination.currentPage}
                numberOfPages={artworks.data.pagination.totalPages}
                label={`${
                  (artworks.data.pagination.currentPage - 1) *
                    artworks.data.pagination.limit +
                  1
                }-${
                  artworks.data.pagination.currentPage *
                  artworks.data.pagination.limit
                } of ${artworks.data.pagination.total}`}
                showFastPaginationControls
                numberOfItemsPerPageList={[10, 20, 30, 40, 50]}
                numberOfItemsPerPage={artworks.data.pagination.limit}
                onPageChange={page => {
                  setPage(page);
                }}
                onItemsPerPageChange={itemsPerPage => {
                  setLimit(itemsPerPage);
                }}
                selectPageDropdownLabel={'Rows per page'}
              />
            </Surface>
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
    //padding: 16,
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

export default Home;
