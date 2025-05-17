import React from 'react';
import {WebView} from 'react-native-webview';
import {View, StyleSheet} from 'react-native';

interface WebPageViewerProps {
  url: string;
}

const WebPageViewer = ({url}: WebPageViewerProps) => {
  return (
    <View style={styles.container}>
      <WebView source={{uri: url}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebPageViewer;
