import {useRef, useCallback} from 'react';
import type {ComponentRef} from 'react';
import {NaverMapView} from '@mj-studio/react-native-naver-map';
import {Coordinates} from '../../types/map';

interface UseMapOptions {
  onCenterChange?: (center: Coordinates) => void;
}

export const useMap = ({onCenterChange}: UseMapOptions) => {
  const mapRef = useRef<ComponentRef<typeof NaverMapView>>(null);

  const handleCameraChange = useCallback(
    ({latitude, longitude}: {latitude: number; longitude: number}) => {
      if (onCenterChange) {
        onCenterChange({lat: latitude, lng: longitude});
      }
    },
    [onCenterChange],
  );

  return {
    mapRef,
    handleCameraChange, // <- 반드시 onCameraChanged로 전달할 것
  };
};
