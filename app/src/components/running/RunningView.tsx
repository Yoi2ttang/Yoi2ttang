import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
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
import {
  PostLocationResponse,
  usePostLocation,
} from '../../hooks/running/usePostLocation';
import {TileMapResponse} from '../../services/running/api';

const StyledView = styled(View);
const StyledText = styled(Text);

interface RunningViewProps {
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
}

const RunningView = ({isPaused, setIsPaused}: RunningViewProps) => {
  const [hasStartedRunning, setHasStartedRunning] = useState(false);

  const [loc, setLoc] = useState<Coordinates>();
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [center, setCenter] = useState<Coordinates | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(15);

  const {currentLoc} = useRunningStats({isPaused});
  const {mutate: startRunning} = usePostStartRunning();
  const {runningId, setRunningId} = useRunningStatsContext();

  const beforeLocRef = useRef<Coordinates | null>(null);
  const {mutate: postLocation} = usePostLocation();

  const [lastSentPayload, setLastSentPayload] = useState<string>('전송 없음');
  const [visitedTiles, setVisitedTiles] = useState<
    {geoHash: string; sw: Coordinates; ne: Coordinates}[]
  >([]);

  const [lastResponse, setLastResponse] = useState<
    PostLocationResponse | PostLocationResponse[] | null
  >(null);

  const [showTile, setShowTile] = useState(true);
  const [selectedTileView, setSelectedTileView] = useState<
    'my' | 'team' | 'empty' | null
  >('my');

  useEffect(() => {
    if (!currentLoc || hasStartedRunning) return;

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
          setRunningId(data.runningId);

          const {geoHash, sw, ne} = data;

          if (!geoHash || !sw?.lat || !ne?.lat) return;

          setVisitedTiles(prev => {
            const alreadyExists = prev.some(t => t.geoHash === geoHash);
            if (alreadyExists) return prev;
            console.log(`🆕 시작 타일 저장됨: ${geoHash}`);
            return [...prev, {geoHash, sw, ne}];
          });

          setHasStartedRunning(true); // 더 이상 실행되지 않도록 설정
        },
        onError: err => {
          console.error('러닝 시작 실패', err);
        },
      },
    );
  }, [currentLoc, hasStartedRunning]);

  const {data: tileData} = useGetTeamTileMap({
    center: center || currentLoc!,
  });

  const {data: clusterData} = useGetTeamTileMapCluster({
    center: center || currentLoc!,
    zoomLevel,
  });

  useEffect(() => {
    if (!currentLoc || !runningId) {
      console.log('⛔ 위치 전송 불가 - currentLoc 또는 runningId 없음');
      return;
    }

    const interval = setInterval(() => {
      if (!beforeLocRef.current) {
        beforeLocRef.current = currentLoc;
        return;
      }

      const payload = {
        runningId,
        beforePoint: beforeLocRef.current,
        nowPoint: currentLoc,
        currentTime: new Date().toISOString(),
      };

      postLocation(payload, {
        onSuccess: (
          response: PostLocationResponse | PostLocationResponse[],
        ) => {
          console.log('✅ 위치 전송 성공:', response);
          setLastResponse(response); // ✅ 상태에 저장

          const responses = Array.isArray(response) ? response : [response];

          responses.forEach(tile => {
            if (!tile.geoHash || !tile.sw?.lat || !tile.ne?.lat) return;

            setVisitedTiles(prev => {
              const alreadyExists = prev.some(t => t.geoHash === tile.geoHash);
              if (alreadyExists) return prev;

              return [
                ...prev,
                {
                  geoHash: tile.geoHash,
                  sw: tile.sw,
                  ne: tile.ne,
                },
              ];
            });
          });
        },

        onError: err => {
          console.error('🚨 위치 전송 실패:', err);
        },
      });

      setLastSentPayload(
        `📍 내 위치 전송됨:\n` +
          `FROM: (${payload.beforePoint.lat.toFixed(
            5,
          )}, ${payload.beforePoint.lng.toFixed(5)})\n` +
          `TO:   (${payload.nowPoint.lat.toFixed(
            5,
          )}, ${payload.nowPoint.lng.toFixed(5)})\n` +
          `🕒 ${payload.currentTime}`,
      );

      beforeLocRef.current = currentLoc;
    }, 5000);

    return () => clearInterval(interval);
  }, [currentLoc, runningId]);

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
      {/* <StyledText className="absolute bottom-4 left-4 right-4 bg-white z-50 p-2 rounded text-xs">
        마지막 전송:\n{lastSentPayload}
      </StyledText> */}
      {/* <StyledText className="absolute bottom-24 left-4 right-4 bg-white z-50 p-2 rounded text-xs h-40">
        타일 수: {visitedTiles.length}
        {'\n'}
        {visitedTiles.map(t => t.geoHash).join(', ')}
      </StyledText> */}
      {/* <StyledText className="absolute bottom-64 left-4 right-4 bg-white z-50 p-2 rounded text-xs h-40 overflow-scroll">
        🔁 마지막 응답:
        {'\n'}
        {lastResponse ? JSON.stringify(lastResponse, null, 2) : '응답 없음'}
      </StyledText> */}

      {currentLoc && loc && (
        <StyledNaverMapView
          className="flex-1"
          locale="ko"
          isShowZoomControls={false}
          initialCamera={{
            latitude: loc.lat,
            longitude: loc.lng,
            zoom: 13,
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
          {selectedTileView === 'empty' &&
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
                  zIndex={9999}
                />
              );
            })}

          {/* 내가 방문한 타일 */}
          {selectedTileView === 'my' &&
            visitedTiles.map(({geoHash, sw, ne}) => (
              <NaverMapPolygonOverlay
                key={`visited-${geoHash}`}
                coords={[
                  {latitude: sw.lat, longitude: sw.lng},
                  {latitude: ne.lat, longitude: sw.lng},
                  {latitude: ne.lat, longitude: ne.lng},
                  {latitude: sw.lat, longitude: ne.lng},
                ]}
                color="rgba(255, 124, 100, 0.4)"
                outlineColor="#ff7c64"
                outlineWidth={1}
                zIndex={998}
              />
            ))}

          {zoomLevel < 16 &&
            selectedTileView === 'team' &&
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
      <RunningTimer tileCnt={visitedTiles.length} />

      {showStats && (
        <RunningInfoSlide
          onClose={() => setShowStats(false)}
          setIsPaused={setIsPaused}
          isPaused={isPaused}
          tileCnt={visitedTiles.length}
        />
      )}

      <RunningSettingsButton
        onClick={() => setShowSettings(true)}
        selectedTileView={selectedTileView}
      />
      {showSettings && (
        <RunningSettingsModal
          onClose={() => setShowSettings(false)}
          showTile={showTile}
          setShowTile={setShowTile}
          selectedTileView={selectedTileView}
          setSelectedTileView={setSelectedTileView}
        />
      )}
    </StyledView>
  );
};

export default RunningView;
