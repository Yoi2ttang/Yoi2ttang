import {Coordinates} from '../types/map';

export const getBoundsFromCenterAndZoom = (
  center: Coordinates | undefined | null,
  zoom: number,
): {sw: Coordinates; ne: Coordinates} | null => {
  if (!center) return null;

  // 더 정밀한 delta 값 (각 레벨마다 약 2배씩 확대 기준)
  let delta;
  if (zoom >= 20) delta = 0.0005;
  else if (zoom >= 19) delta = 0.001;
  else if (zoom >= 18) delta = 0.002;
  else if (zoom >= 17) delta = 0.004;
  else if (zoom >= 16) delta = 0.008;
  else if (zoom >= 15) delta = 0.016;
  else if (zoom >= 14) delta = 0.032;
  else if (zoom >= 13) delta = 0.064;
  else if (zoom >= 12) delta = 0.128;
  else if (zoom >= 11) delta = 0.256;
  else if (zoom >= 10) delta = 0.512;
  else delta = 1;

  return {
    sw: {
      lat: center.lat - delta,
      lng: center.lng - delta,
    },
    ne: {
      lat: center.lat + delta,
      lng: center.lng + delta,
    },
  };
};
