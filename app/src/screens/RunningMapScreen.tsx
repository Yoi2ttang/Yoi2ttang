import React from 'react';
import {View} from 'react-native';
import {styled} from 'nativewind';
import {NaverMapView} from '@mj-studio/react-native-naver-map';

const StyledView = styled(View);
const StyledNaverMapView = styled(NaverMapView);

const RunningMapScreen = () => {
  return (
    <StyledView className="flex-1">
      <StyledNaverMapView className="flex-1" locale="ko" logoAlign="TopRight" />
    </StyledView>
  );
};

export default RunningMapScreen;
