import React from 'react';
import {Pressable, Image} from 'react-native';
import {styled} from 'nativewind';

interface RunningStatsButtonProps {
  onClick: () => void;
}

const StyledPressable = styled(Pressable);

const RunningStatsButton = ({onClick}: RunningStatsButtonProps) => (
  <StyledPressable
    onPress={onClick}
    className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md active:scale-95">
    <Image
      source={require('../../assets/icons/arrow-left.png')}
      style={{width: 24, height: 24}}
    />
  </StyledPressable>
);

export default RunningStatsButton;
