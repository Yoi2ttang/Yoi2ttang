import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

const WebViewScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleMessage = (event: any) => {
    try {
      const rawData = event.nativeEvent.data;

      if (typeof rawData === 'string') {
        // ✅ 1. JSON 형태인지 아닌지 확인
        if (rawData === 'navigateToRunning') {
          navigation.navigate('NaverMap');
          return;
        }

        // ✅ 2. JSON인 경우 파싱 시도
        try {
          const data = JSON.parse(rawData);
          if (data.type === 'REISSUE_TOKEN_RESPONSE') {
            console.log('✅ accessToken 수신:', data.accessToken);
          } else {
            console.warn('⚠️ 알 수 없는 메시지 type:', data.type);
          }
        } catch (jsonError) {
          console.warn('⚠️ 문자열이지만 JSON 아님:', rawData);
        }
      } else {
        console.warn('⚠️ 알 수 없는 메시지 형식:', rawData);
      }
    } catch (e) {
      console.error('❌ onMessage 처리 실패:', e);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'https://yoi2ttang.site'}}
        onMessage={handleMessage}
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
