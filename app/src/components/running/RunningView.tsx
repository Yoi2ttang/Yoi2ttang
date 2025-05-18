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

const StyledView = styled(View);

interface RunningViewProps {
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
}

const RunningView = ({isPaused, setIsPaused}: RunningViewProps) => {
  const [loc, setLoc] = useState<Coordinates>();
  const {currentLoc} = useRunningStats({isPaused});
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (currentLoc) setLoc(currentLoc);
  }, [currentLoc]);

  return (
    <StyledView className="flex-1 relative w-full">
      {currentLoc && loc && (
        <StyledNaverMapView
          className="flex-1"
          locale="ko"
          isShowZoomControls={false}
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
