import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import {styled} from 'nativewind';

const AnimatedView = styled(Animated.View);

const CurrentLocationMarker = () => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]),
    ).start();
  }, [scale, opacity]);

  return (
    <AnimatedView className="relative justify-center items-center w-6 h-6 rounded-full">
      <AnimatedView
        className="absolute w-6 h-6 bg-blue-300 rounded-full"
        style={{
          transform: [{scale}],
          opacity,
        }}
      />
      <AnimatedView className="w-3 h-3 bg-blue-500 rounded-full z-10" />
    </AnimatedView>
  );
};

export default CurrentLocationMarker;
