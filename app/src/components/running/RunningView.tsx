import React, {useState, Dispatch, SetStateAction, useEffect} from 'react';
import {View} from 'react-native';
import {styled} from 'nativewind';
import {Coordinates} from '../../types/map';
import {useRunningStats} from '../../hooks/useRunningStats';
import {StyledNaverMapView} from '../map/StyledNaverMapView';
import RunningStatsButton from './RunningStatsButton';
import RunningTimer from './RunningTimer';
import RunningInfoSlide from './RunningInfoSlide';
import RunningSettingsButton from './RunningSettingsButton';
import RunningSettingsModal from './RunningSettingsModal';
import {usePostStartRunning} from '../../hooks/running/usepostStartRunning';
import {useRunningStatsContext} from '../../hooks/useRunningStatsContext';

const StyledView = styled(View);

interface RunningViewProps {
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
}

const RunningView = ({isPaused, setIsPaused}: RunningViewProps) => {
  const [loc, setLoc] = useState<Coordinates>();
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const {currentLoc} = useRunningStats({isPaused});
  const {mutate: startRunning} = usePostStartRunning();
  const {setRunningId} = useRunningStatsContext();

  useEffect(() => {
    if (!currentLoc) return;

    setLoc(currentLoc);

    startRunning(
      {
        lat: currentLoc.lat,
        lng: currentLoc.lng,
        currentTime: new Date().toISOString(),
      },
      {
        onSuccess: data => {
          console.log('러닝 시작 성공', data);
          console.log('받은 runningId:', data.runningId);
          setRunningId(data.runningId);
        },
        onError: err => {
          console.error('러닝 시작 실패', err);
        },
      },
    );
  }, [startRunning, currentLoc]);

  return (
    <StyledView className="flex-1 relative w-full">
      {currentLoc && loc && (
        <StyledNaverMapView
          className="flex-1"
          locale="ko"
          isShowZoomControls={false}
          initialCamera={{
            latitude: loc.lat,
            longitude: loc.lng,
            zoom: 15,
          }}
        />
      )}
      <RunningStatsButton onClick={() => setShowStats(true)} />
      <RunningTimer />

      {showStats && (
        <RunningInfoSlide
          onClose={() => setShowStats(false)}
          setIsPaused={setIsPaused}
          isPaused={isPaused}
        />
      )}

      <RunningSettingsButton onClick={() => setShowSettings(true)} />
      {showSettings && (
        <RunningSettingsModal onClose={() => setShowSettings(false)} />
      )}
    </StyledView>
  );
};

export default RunningView;
