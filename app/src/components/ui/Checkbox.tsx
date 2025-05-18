import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {styled} from 'nativewind';

interface Props {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const StyledPressable = styled(Pressable);
const StyledView = styled(View);

const Checkbox = ({value, onValueChange}: Props) => {
  return (
    <StyledPressable
      onPress={() => onValueChange(!value)}
      className={`w-5 h-5 items-center justify-center rounded border ${
        value ? 'bg-white border-green-500' : 'bg-white border-neutral-300'
      }`}>
      {value && (
        <Image
          source={require('../../assets/icons/check.png')}
          style={{width: 16, height: 16}}
        />
      )}
    </StyledPressable>
  );
};

export default Checkbox;
