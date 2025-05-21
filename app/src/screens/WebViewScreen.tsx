import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, BackHandler, ToastAndroid, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import {RouteProp} from '@react-navigation/native';

const WebViewScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [currentUrl, setCurrentUrl] = useState<string>(
    'https://yoi2ttang.site',
  );

  const [receivedToken, setReceivedToken] = useState<string | null>(null);
  const webViewRef = useRef<WebView>(null);
  const canGoBackRef = useRef(false);
  const lastBackPress = useRef<number>(0); // ✅ 마지막 뒤로가기 시간

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

  // ✅ Android 뒤로가기 핸들링
  useEffect(() => {
    const handleBackPress = () => {
      if (currentUrl === 'https://yoi2ttang.site/dashboard/my') {
        const now = Date.now();
        if (now - lastBackPress.current < 2000) {
          BackHandler.exitApp(); // ✅ 두 번째 눌렀을 때 앱 종료
        } else {
          ToastAndroid.show(
            '종료하려면 한 번 더 눌러주세요',
            ToastAndroid.SHORT,
          );
          lastBackPress.current = now;
        }
        return true;
      }

      if (canGoBackRef.current && webViewRef.current) {
        webViewRef.current.goBack(); // ✅ 그 외는 웹뷰 뒤로가기
        return true;
      }

      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      subscription.remove(); // ✅ Type-safe 정리
    };
  }, [currentUrl]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{uri: targetUrl}}
        onMessage={handleMessage}
        onNavigationStateChange={navState => {
          canGoBackRef.current = navState.canGoBack;
          setCurrentUrl(navState.url); // ✅ 현재 URL 추적
        }}
        geolocationEnabled={true}
        userAgent="yoi2ttang-webview"
      />

      {/* <Text>20250521 - 17:24</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
