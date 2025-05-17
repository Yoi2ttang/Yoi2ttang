import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App'; // App.tsx 위치에 따라 경로 조정

const WebViewScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'https://yoi2ttang.site'}}
        onMessage={event => {
          if (event.nativeEvent.data === 'navigateToRunning') {
            navigation.navigate('NaverMap');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
