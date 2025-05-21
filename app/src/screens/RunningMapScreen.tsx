import React, {useState} from 'react';
import {View} from 'react-native';
import {styled} from 'nativewind';
import Countdown from '../components/running/Countdown';
import useCountdown from '../hooks/useCountdown';
import RunningView from '../components/running/RunningView';
import {RunningStatsProvider} from '../components/providers/RunningStatsProvider';

const StyledView = styled(View);

const RunningMapScreen = () => {
  const [showMap, setShowMap] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const count = useCountdown({
    start: 3,
    onComplete: () => setShowMap(true),
  });

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
