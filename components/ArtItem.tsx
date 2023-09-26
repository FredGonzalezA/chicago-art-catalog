import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import sanitizeHtml from 'sanitize-html';
import {ArtWork} from '../types/global';
import {getImageUrl} from '../utils/image';

export const ArtItem: React.FC<{item: ArtWork}> = ({item}) => {
  const description = React.useMemo(() => {
    return sanitizeHtml(item.description ?? '', {allowedTags: []});
  }, [item.description]);
  return (
    <Card>
      <Card.Cover
        source={{
          uri: item.imageId ? getImageUrl(item.imageId) : undefined,
        }}
        theme={{
          // Removes border radius at the bottom
          isV3: false,
        }}
      />
      <Card.Title
        style={styles.title}
        titleVariant="titleLarge"
        title={item.title}
        subtitle={description}
        subtitleNumberOfLines={2}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 8,
    marginBottom: 16,
  },
});
