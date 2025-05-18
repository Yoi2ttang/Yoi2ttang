import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  View,
  Text,
} from 'react-native';
import {styled} from 'nativewind';
import RunningStats from './RunningStats';
import RunningPaceLogger from './RunningPaceLogger';
import {useRunningStatsContext} from '../../hooks/useRunningStatsContext';
import RunningActions from './RunningActions';

interface RunningInfoSlideProps {
  onClose: () => void;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const StyledSlideContainer = styled(Animated.View);
const StyledOverlay = styled(Pressable);
const StyledAnimatedText = styled(Animated.Text);

const RunningInfoSlide = ({
  onClose,
  isPaused,
  setIsPaused,
}: RunningInfoSlideProps) => {
  const {
    runningTime,
    distance,
    calories,
    speed,
    averagePace,
    paceHistory,
    saveCurrentPace,
  } = useRunningStatsContext();

  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false, // ✅ layout 관련 transform은 false로 설정
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(translateX, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      console.log('닫기 완료');
      onClose();
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, gestureState) => {
      console.log('스와이프 거리:', gestureState.dx);
      if (gestureState.dx > 100) {
        handleClose();
      }
    },
  });

  return (
    <StyledOverlay className="inset-0 z-[9999] bg-white">
      <StyledSlideContainer
        className="h-full w-full bg-white px-4 py-8"
        style={{transform: [{translateX}]}}
        {...panResponder.panHandlers}>
        <StyledAnimatedText className="text-2xl font-semibold mb-2">
          러닝 기록
        </StyledAnimatedText>

        <RunningStats
          runningTime={runningTime}
          distance={distance}
          calories={calories}
          speed={speed}
          averagePace={averagePace}
        />

        <RunningPaceLogger
          paceHistory={paceHistory}
          saveCurrentPace={saveCurrentPace}
        />
        <RunningActions isPaused={isPaused} setIsPaused={setIsPaused} />
      </StyledSlideContainer>
    </StyledOverlay>
  );
};

export default RunningInfoSlide;
