import React, {useState, Dispatch, SetStateAction, useEffect} from 'react';
import {View, Text} from 'react-native';
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
import useGetTeamTileMap from '../../hooks/running/useGetTeamTileMap';
import useGetTeamTileMapCluster from '../../hooks/running/useGetTeamTileMapCluster';
import {
  NaverMapMarkerOverlay,
  NaverMapPolygonOverlay,
} from '@mj-studio/react-native-naver-map';

const StyledView = styled(View);
const StyledText = styled(Text);

interface RunningViewProps {
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
}

const RunningView = ({isPaused, setIsPaused}: RunningViewProps) => {
  const [loc, setLoc] = useState<Coordinates>();
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [center, setCenter] = useState<Coordinates | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(15);

  const {currentLoc} = useRunningStats({isPaused});
  const {mutate: startRunning} = usePostStartRunning();
  const {runningId, setRunningId} = useRunningStatsContext();

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

  const {data: tileData} = useGetTeamTileMap({
    center: center || currentLoc!,
  });

  const {data: clusterData} = useGetTeamTileMapCluster({
    center: center || currentLoc!,
    zoomLevel,
  });

  return (
    <StyledView className="flex-1 relative w-full">
      <StyledText className="absolute top-4 left-4 bg-white z-50 p-2 rounded">
        {currentLoc
          ? `위도: ${currentLoc.lat.toFixed(6)}\n경도: ${currentLoc.lng.toFixed(
              6,
            )} \n${runningId}`
          : '위치 정보 없음'}
      </StyledText>
      <StyledText className="absolute top-4 right-4 bg-white z-50 p-2 rounded">
        줌: {zoomLevel}
      </StyledText>
      <StyledText className="absolute top-4 right-4 bg-white z-50 p-2 rounded">
        줌: {zoomLevel}
        {'\n'}
        중심: {center?.lat?.toFixed(5)}, {center?.lng?.toFixed(5)}
      </StyledText>
      {/* <StyledText className="absolute bottom-4 left-4 bg-white z-50 p-2 rounded w-[90%] h-[150px] overflow-scroll">
        {JSON.stringify(tileData, null, 2)}
      </StyledText> */}

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
          onCameraChanged={({latitude, longitude, zoom}) => {
            if (zoom !== undefined) {
              setZoomLevel(zoom);
            }
            if (latitude !== undefined && longitude !== undefined) {
              setCenter({
                lat: latitude,
                lng: longitude,
              });
            }
          }}>
          {/* ✅ 지도 내부로 이동 */}
          {zoomLevel >= 16 &&
            tileData?.tileGetResponseList?.map(tile => {
              const {sw, ne} = tile;
              return (
                <NaverMapPolygonOverlay
                  key={tile.geoHash}
                  coords={[
                    {latitude: sw.lat, longitude: sw.lng},
                    {latitude: ne.lat, longitude: sw.lng},
                    {latitude: ne.lat, longitude: ne.lng},
                    {latitude: sw.lat, longitude: ne.lng},
                  ]}
                  color="rgba(255, 124, 100, 0.4)" // ✅ 배경 색 (40% 투명도)
                  outlineColor="#ff7c64"
                  outlineWidth={2}
                  zIndex={999}
                />
              );
            })}

          {zoomLevel < 16 &&
            clusterData?.tileClusterGetResponseList?.map(cluster => (
              <NaverMapMarkerOverlay
                key={`${cluster.zodiacId}-${cluster.geoPoint.lat}-${cluster.geoPoint.lng}`}
                latitude={cluster.geoPoint.lat}
                longitude={cluster.geoPoint.lng}
                caption={{text: `${cluster.count}`}}
              />
            ))}
        </StyledNaverMapView>
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
