import React from 'react';
import {View} from 'react-native';
import { NaverMapView } from '@mj-studio/react-native-naver-map';

function App(): React.JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <NaverMapView
        style={{ flex: 1 }}
        locale="ko"
        logoAlign="TopRight"
      />
    </View>
  );
}

export default App;