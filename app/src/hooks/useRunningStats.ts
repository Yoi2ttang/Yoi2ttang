import {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';
import {calculateCalories} from '../lib/calory';

interface Coordinates {
  lat: number;
  lng: number;
}

const getDistance = (loc1: Coordinates, loc2: Coordinates) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371e3;
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

interface DistanceRecord {
  timestamp: number;
  distance: number;
}

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한 요청',
          message: '러닝 기록을 위해 위치 권한이 필요합니다.',
          buttonPositive: '확인',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

export const useRunningStats = ({isPaused, weight}: useRunningStatsProps) => {
  const [currentLoc, setCurrentLoc] = useState<Coordinates>();
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [runningTime, setRunningTime] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [averagePace, setAveragePace] = useState(0);
  const [paceHistory, setPaceHistory] = useState<PaceRecord[]>([]);
  const [runningId, setRunningId] = useState<number | null>(null);

  const prevLoc = useRef<Coordinates | null>(null);
  const distanceRef = useRef(0);
  const timeRef = useRef(0);
  const watchIdRef = useRef<number | null>(null);
  const distanceLogRef = useRef<DistanceRecord[]>([]);

  const windowDuration = 5000;
  const minWindowDistance = 10;

  useEffect(() => {
    const initLocationTracking = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        console.warn('위치 권한이 거부되었습니다.');
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          const initialLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLoc(initialLoc);
          prevLoc.current = initialLoc;
        },
        error => {
          console.error('초기 위치 가져오기 실패:', error);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 10000,
        },
      );

      const watchId = Geolocation.watchPosition(
        position => {
          const nextLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLoc(nextLoc);

          const now = Date.now();

          if (prevLoc.current) {
            const d = getDistance(prevLoc.current, nextLoc);

            // 거리 기록 저장
            distanceLogRef.current.push({timestamp: now, distance: d});

            // 5초 이내 기록만 유지
            distanceLogRef.current = distanceLogRef.current.filter(
              record => now - record.timestamp <= windowDuration,
            );

            // 누적 거리 계산
            const windowDistance = distanceLogRef.current.reduce(
              (acc, r) => acc + r.distance,
              0,
            );

            if (windowDistance >= minWindowDistance) {
              console.log('많이감');
              distanceRef.current += d;
              setDistance(distanceRef.current);

              const timeInHours = timeRef.current / 3600;
              const distanceInKm = distanceRef.current / 1000;

              if (timeRef.current > 0 && distanceInKm > 0) {
                setSpeed(distanceInKm / timeInHours);
                setAveragePace(timeRef.current / distanceInKm);
              }

              setCalories(
                calculateCalories(distanceInKm, timeRef.current, weight ?? 50),
              );
            }
          }

          prevLoc.current = nextLoc;
        },
        error => {
          console.error('위치 가져오기 실패:', error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 1,
          interval: 1000,
          fastestInterval: 1000,
        },
      );

      watchIdRef.current = watchId;
    };

    initLocationTracking();

    return () => {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [weight]);

  useEffect(() => {
    const id = setInterval(() => {
      if (isPaused) return;
      setRunningTime(prev => prev + 1);
      timeRef.current += 1;
    }, 1000);

    return () => clearInterval(id);
  }, [isPaused]);

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
