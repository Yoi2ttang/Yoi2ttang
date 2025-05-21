import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {waitForTokenFromWebView} from '../lib/tokenWaiter';

let webViewRef: WebView | null = null;

export const setWebViewRef = (ref: WebView | null) => {
  webViewRef = ref;
};

interface RetryableAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const apiClient = axios.create({
  baseURL: 'https://yoi2ttang.site/api/v1', // 실제 API 서버 주소로 교체
  timeout: 8000,
});

apiClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      webViewRef
    ) {
      originalRequest._retry = true;

      // WebView에 재발급 요청 전송
      webViewRef.postMessage(JSON.stringify({type: 'REISSUE_TOKEN_REQUEST'}));

      try {
        const newToken = await waitForTokenFromWebView();
        await AsyncStorage.setItem('accessToken', newToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      } catch (e) {
        Alert.alert('세션 만료', '다시 로그인해주세요.');
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
