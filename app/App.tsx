import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WebViewScreen from './src/screens/WebViewScreen';
import RunningMapScreen from './src/screens/RunningMapScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'; // ✅ 추가

export type RootStackParamList = {
  WebView: {targetUrl?: string} | undefined;
  NaverMap: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient(); // ✅ 생성

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* ✅ 감싸기 */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WebView">
          <Stack.Screen
            name="WebView"
            component={WebViewScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NaverMap"
            component={RunningMapScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
