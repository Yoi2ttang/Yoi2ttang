import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NaverMapView} from '@mj-studio/react-native-naver-map';

const RunningMapScreen = () => {
  return (
    <View style={styles.container}>
      <NaverMapView style={{flex: 1}} locale="ko" logoAlign="TopRight" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RunningMapScreen;
