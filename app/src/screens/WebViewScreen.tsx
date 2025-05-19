import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';

const WebViewScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [receivedToken, setReceivedToken] = useState<string | null>(null);
  const webViewRef = useRef<WebView>(null);

  const route = useRoute<RouteProp<RootStackParamList, 'WebView'>>();
  const targetUrl = route.params?.targetUrl ?? 'https://yoi2ttang.site';

  const handleMessage = async (event: any) => {
    try {
      const rawData = event.nativeEvent.data;

      if (typeof rawData === 'string') {
        if (rawData === 'navigateToRunning') {
          navigation.navigate('NaverMap');
          return;
        }

        try {
          const data = JSON.parse(rawData);

          if (data.type === 'REISSUE_TOKEN_RESPONSE') {
            const newAccessToken = data.accessToken;
            console.log('✅ accessToken 수신:', newAccessToken);
            setReceivedToken(newAccessToken);

            // ✅ AsyncStorage에 저장
            await AsyncStorage.setItem('accessToken', newAccessToken);
            console.log('💾 토큰 저장 완료!');
          } else {
            console.warn('⚠️ 알 수 없는 메시지 type:', data.type);
          }
        } catch {
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
        ref={webViewRef}
        source={{uri: targetUrl}}
        onMessage={handleMessage}
        geolocationEnabled={true}
      />
      {/* {receivedToken && (
        <Text style={styles.tokenText}>
          ✔️ 토큰 저장됨: {receivedToken.slice(0, 10)}...
        </Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tokenText: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    color: 'green',
    fontSize: 14,
  },
});

export default WebViewScreen;
