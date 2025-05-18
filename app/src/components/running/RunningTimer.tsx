import React from 'react';
import {View, Text} from 'react-native';
import {styled} from 'nativewind';
import {useRunningStatsContext} from '../../hooks/useRunningStatsContext';
import {formatSecondsToTime} from '../../lib/time';

const StyledView = styled(View);
const StyledText = styled(Text);

const RunningTimer = () => {
  const {runningTime} = useRunningStatsContext();
  const formattedTime = formatSecondsToTime(runningTime);

  return (
    <StyledView className="absolute w-full top-10 z-10 flex-col gap-y-3 rounded-lg">
      <StyledText className="text-5xl font-bold text-black italic text-center">
        {formattedTime}
      </StyledText>
      <StyledView className="flex-row items-center justify-center gap-x-2">
        <StyledView
          className="w-3 h-3 bg-[#ff5434]"
          style={{transform: [{rotate: '12deg'}]}}
        />
        <StyledText className="text-2xl font-bold text-center">102</StyledText>
      </StyledView>
    </StyledView>
  );
};

export default RunningTimer;
