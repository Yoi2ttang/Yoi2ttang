import {useEffect, useRef, useState} from 'react';
import {calculateCalories} from '../lib/calory';

interface Coordinates {
  lat: number;
  lng: number;
}

const getDistance = (loc1: Coordinates, loc2: Coordinates) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371e3; // Earth radius in meters
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLng = toRad(loc2.lng - loc1.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(loc1.lat)) *
      Math.cos(toRad(loc2.lat)) *
      Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

interface useRunningStatsProps {
  isPaused?: boolean;
  weight?: number;
}

interface PaceRecord {
  fromTime: number;
  toTime: number;
  fromDistance: number;
  toDistance: number;
  pace: number; // sec/km
}

export const useRunningStats = ({isPaused, weight}: useRunningStatsProps) => {
  const locRef = useRef<Coordinates>({lat: 0, lng: 0});
  const prevLoc = useRef<Coordinates | null>(null);

  const [runningId, setRunningId] = useState<number | null>(null);

  const [currentLoc, setCurrentLoc] = useState<Coordinates>();
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [runningTime, setRunningTime] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [averagePace, setAveragePace] = useState(0);
  const [paceHistory, setPaceHistory] = useState<PaceRecord[]>([]);

  const distanceRef = useRef(0);
  const timeRef = useRef(0);

  const moveSteps = [
    0.000027, 0.000027, 0.000027, 0.000027, 0.000027, 0.000018, 0.000018,
    0.000009, 0.000009, 0.000009, 0.000009, 0.000009,
  ];
  const stepIndexRef = useRef(0);

  useEffect(() => {
    // 실제 앱에서는 @react-native-community/geolocation 또는 expo-location 사용 권장
    const initialLoc: Coordinates = {lat: 37.5665, lng: 126.978}; // 서울시청 예시
    locRef.current = initialLoc;
    prevLoc.current = initialLoc;
    setCurrentLoc(initialLoc);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (isPaused) return;

      setRunningTime(prev => prev + 1);

      const step = moveSteps[stepIndexRef.current];
      const nextLoc = {
        lat: locRef.current.lat + step,
        lng: locRef.current.lng,
      };

      stepIndexRef.current = (stepIndexRef.current + 1) % moveSteps.length;

      if (prevLoc.current) {
        const d = getDistance(prevLoc.current, nextLoc);
        distanceRef.current += d;
        setDistance(distanceRef.current);

        if (timeRef.current > 0) {
          const distanceInKm = distanceRef.current / 1000;
          const timeInHours = timeRef.current / 3600;
          setSpeed(distanceInKm / timeInHours);
          setAveragePace(timeRef.current / distanceInKm);
        }

        setCalories(
          calculateCalories(
            distanceRef.current / 1000,
            timeRef.current,
            weight ?? 50,
          ),
        );
      }

      prevLoc.current = nextLoc;
      locRef.current = nextLoc;
      setCurrentLoc(nextLoc);
      timeRef.current += 1;
    }, 1000);

    return () => clearInterval(id);
  }, [isPaused, weight]);

  const saveCurrentPace = () => {
    if (distanceRef.current === 0 || timeRef.current === 0) return;

    const lastRecord = paceHistory.at(-1);
    const fromTime = lastRecord?.toTime ?? 0;
    const fromDistance = lastRecord?.toDistance ?? 0;
    const toTime = timeRef.current;
    const toDistance = distanceRef.current;

    const duration = toTime - fromTime;
    const distanceDelta = (toDistance - fromDistance) / 1000;

    if (distanceDelta === 0) return;

    const pace = duration / distanceDelta;

    setPaceHistory(prev => [
      ...prev,
      {
        fromTime,
        toTime,
        fromDistance,
        toDistance,
        pace,
      },
    ]);
  };

  return {
    runningId,
    setRunningId,
    runningTime,
    distance,
    calories,
    speed,
    averagePace,
    currentLoc,
    paceHistory,
    saveCurrentPace,
  };
};
