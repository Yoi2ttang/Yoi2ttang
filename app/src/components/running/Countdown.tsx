import React from 'react';
import {Text, View} from 'react-native';
import {styled} from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface CountdownProps {
  count: number;
}

const Countdown = ({count}: CountdownProps) => {
  return (
    <StyledView className="flex-1 items-center justify-center bg-black">
      <StyledText className="text-white text-9xl font-bold">{count}</StyledText>
    </StyledView>
  );
};

export default Countdown;
