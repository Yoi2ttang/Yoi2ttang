import React from 'react';
import {Image, Pressable} from 'react-native';
import {styled} from 'nativewind';

interface RunningSettingsButtonProps {
  onClick: () => void;
}

const StyledPressable = styled(Pressable);

const RunningSettingsButton = ({onClick}: RunningSettingsButtonProps) => (
  <StyledPressable
    onPress={onClick}
    className="absolute right-4 bottom-8 z-10 rounded-full bg-white p-2 shadow-md active:scale-95">
    <Image
      source={require('../../assets/icons/settings.png')}
      style={{width: 24, height: 24}}
    />
  </StyledPressable>
);

export default RunningSettingsButton;
