import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export const FullLoading: React.FC<{show: boolean}> = ({show}) => {
  if (!show) {
    return null;
  }
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" animating={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
