import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WebViewScreen from './src/screens/WebViewScreen';
import RunningMapScreen from './src/screens/RunningMapScreen';

export type RootStackParamList = {
  WebView: undefined;
  NaverMap: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WebView">
        <Stack.Screen name="WebView" component={WebViewScreen} />
        <Stack.Screen name="NaverMap" component={RunningMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
