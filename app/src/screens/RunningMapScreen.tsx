import React, {useState, useCallback, useRef} from 'react';
import {View, BackHandler, ToastAndroid} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {styled} from 'nativewind';
import Countdown from '../components/running/Countdown';
import useCountdown from '../hooks/useCountdown';
import RunningView from '../components/running/RunningView';
import {RunningStatsProvider} from '../components/providers/RunningStatsProvider';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

const StyledView = styled(View);

const RunningMapScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showMap, setShowMap] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const lastBackPress = useRef<number>(0);

  const count = useCountdown({
    start: 3,
    onComplete: () => setShowMap(true),
  });

  // 뒤로가기 두 번 눌러야 WebView 이동
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        const now = Date.now();

        if (now - lastBackPress.current < 2000) {
          // 2초 이내 재클릭 시 WebView 이동
          navigation.navigate('WebView', {
            targetUrl: 'https://yoi2ttang.site/running/start',
          });
        } else {
          // 첫 클릭 시 토스트
          ToastAndroid.show(
            '한번 더 누르면 점령이 종료됩니다',
            ToastAndroid.SHORT,
          );
          lastBackPress.current = now;
        }

        return true; // 기본 뒤로가기 막기
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => {
        subscription.remove();
      };
    }, [navigation]),
  );

  if (!showMap) {
    return <Countdown count={count} />;
  }

  return (
    <RunningStatsProvider isPaused={isPaused}>
      <StyledView className="flex-1">
        <RunningView isPaused={isPaused} setIsPaused={setIsPaused} />
      </StyledView>
    </RunningStatsProvider>
  );
};

export default RunningMapScreen;
