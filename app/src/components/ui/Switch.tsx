import React from 'react';
import {Switch as RNSwitch} from 'react-native';

interface Props {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const Switch = ({value, onValueChange}: Props) => {
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      trackColor={{false: '#d4d4d8', true: '#ff5434'}}
      thumbColor="white"
      style={{transform: [{scaleX: 0.9}, {scaleY: 0.9}]}}
    />
  );
};

export default Switch;
