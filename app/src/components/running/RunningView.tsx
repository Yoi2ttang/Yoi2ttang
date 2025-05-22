import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import {View, Text, Image} from 'react-native';
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
import useGetTeamTileMapCluster from '../../hooks/running/useGetTeamTileMapCluster';
import {getColorByZodiacId} from '../../lib/zodiacColor';

import {
  NaverMapMarkerOverlay,
  NaverMapPolygonOverlay,
} from '@mj-studio/react-native-naver-map';
import {
  PostLocationResponse,
  usePostLocation,
} from '../../hooks/running/usePostLocation';
import {TileMapResponse} from '../../services/running/api';
import {getBoundsFromCenterAndZoom} from '../../lib/bounds';
import useGetTeamTileMapNew from '../../hooks/running/useGetTeamTileMapNew';
import {getMarkerIconByZodiacId} from '../../lib/markers';
import useGetOneTeamTileMapNew from '../../hooks/running/useGetOneTeamTileMapNew';
import {getPayload} from '../../lib/payload';
import useGetOneTeamTileCluster from '../../hooks/running/useGetOneTeamTileCluster';
import CurrentLocationMarker from './CurrentLocationMarker';
import {getZodiacImage} from '../../lib/zodiacIcon';

const StyledView = styled(View);
const StyledText = styled(Text);

interface RunningViewProps {
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
}

const RunningView = ({isPaused, setIsPaused}: RunningViewProps) => {
  const [zodiacId, setZodiacId] = useState<number | null>(null);

  // payload에서 zodiacId 추출
  useEffect(() => {
    const fetch = async () => {
      const payload = await getPayload();
      if (payload?.zodiacId) {
        setZodiacId(Number(payload.zodiacId));
      }
    };
    fetch();
  }, []);

  const [hasStartedRunning, setHasStartedRunning] = useState(false);

  const [loc, setLoc] = useState<Coordinates>();
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [center, setCenter] = useState<Coordinates | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(15);

  const {currentLoc} = useRunningStats({isPaused});
  const {mutate: startRunning} = usePostStartRunning();
  const {runningId, setRunningId} = useRunningStatsContext();

  const currentLocRef = useRef<Coordinates | undefined>(null);
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
    'my' | 'team' | 'all' | null
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

  const bounds = getBoundsFromCenterAndZoom(center || currentLoc, zoomLevel);
  const {data: tileData} = useGetTeamTileMapNew(
    {
      sw: bounds?.sw || currentLoc!,
      ne: bounds?.ne || currentLoc!,
    },
    {
      enabled: zoomLevel >= 15 && !!bounds && !!currentLoc,
    },
  );

  const {data: clusterData} = useGetTeamTileMapCluster({
    center: center || currentLoc!,
    zoomLevel,
  });

  const {data: oneTeamClusterData} = useGetOneTeamTileCluster({
    zodiacId: zodiacId || 1,
    center: center || currentLoc!,
    zoomLevel,
  });

  const {data: oneTeamTileData} = useGetOneTeamTileMapNew(
    {
      zodiacId: zodiacId || 0,
      sw: bounds?.sw || currentLoc!,
      ne: bounds?.ne || currentLoc!,
    },
    {
      enabled: zoomLevel >= 15 && zodiacId !== null && !!bounds && !!currentLoc,
    },
  );

  useEffect(() => {
    currentLocRef.current = currentLoc;
  }, [currentLoc]);

  useEffect(() => {
    if (!runningId) {
      console.log('⛔ 위치 전송 불가 - runningId 없음');
      return;
    }

    const interval = setInterval(() => {
      const now = currentLocRef.current;
      if (!now) return;

      if (!beforeLocRef.current) {
        // ✅ 최초 1회만 설정 (postLocation은 안 함)
        beforeLocRef.current = now;
        console.log('🟡 최초 beforeLoc 설정');
        return;
      }

      const payload = {
        runningId,
        beforePoint: beforeLocRef.current,
        nowPoint: now,
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

      beforeLocRef.current = now;
    }, 5000);

    return () => clearInterval(interval);
  }, [runningId]);

  return (
    <StyledView className="flex-1 relative w-full">
      {/* <StyledText className="absolute top-4 left-4 bg-white z-50 p-2 rounded">
        {currentLoc
          ? `위도: ${currentLoc.lat}\n경도: ${currentLoc.lng} \n${runningId}`
          : '위치 정보 없음'}
      </StyledText>
      <StyledText className="absolute top-4 right-4 bg-white z-50 p-2 rounded">
        줌: {zoomLevel}
      </StyledText>
      <StyledText className="absolute top-4 right-4 bg-white z-50 p-2 rounded">
        줌: {zoomLevel}
        {'\n'}
        중심: {center?.lat?.toFixed(5)}, {center?.lng?.toFixed(5)}
        {'\n'}
        {tileData?.tileGetResponseList.length}
        {'\n'}
        bounds:
        {bounds?.sw.lat}
        {'\n'}
        {bounds?.sw.lng}
        {'\n'}
        {bounds?.ne.lat}
        {'\n'}
        {bounds?.ne.lng}
      </StyledText> */}

      {currentLoc && loc && (
        <StyledNaverMapView
          className="flex-1"
          locale="ko"
          isShowZoomControls={false}
          isShowLocationButton={false}
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
          {currentLoc && (
            <NaverMapMarkerOverlay
              key="current-location-marker"
              latitude={currentLoc.lat}
              longitude={currentLoc.lng}
              width={24}
              height={24}>
              <CurrentLocationMarker />
            </NaverMapMarkerOverlay>
          )}
          {/* 내가 방문한 타일 */}
          {selectedTileView === 'my' &&
            visitedTiles.map(({geoHash, sw, ne}) => {
              const gap = 0.00003;

              return (
                <NaverMapPolygonOverlay
                  key={`visited-${geoHash}`}
                  coords={[
                    {latitude: sw.lat + gap, longitude: sw.lng + gap},
                    {latitude: ne.lat - gap, longitude: sw.lng + gap},
                    {latitude: ne.lat - gap, longitude: ne.lng - gap},
                    {latitude: sw.lat + gap, longitude: ne.lng - gap},
                  ]}
                  color="rgba(255, 124, 100, 0.4)"
                  outlineColor="#ff7c64"
                  outlineWidth={1}
                  zIndex={998}
                />
              );
            })}

          {/* 우리팀 타일 */}
          {zoomLevel > 15 &&
            selectedTileView === 'team' &&
            oneTeamTileData?.tileGetResponseList.map(({geoHash, sw, ne}) => {
              const gap = 0.00003;

              return (
                <NaverMapPolygonOverlay
                  key={`visited-${geoHash}`}
                  coords={[
                    {latitude: sw.lat + gap, longitude: sw.lng + gap},
                    {latitude: ne.lat - gap, longitude: sw.lng + gap},
                    {latitude: ne.lat - gap, longitude: ne.lng - gap},
                    {latitude: sw.lat + gap, longitude: ne.lng - gap},
                  ]}
                  color="rgba(255, 124, 100, 0.4)"
                  outlineColor="#ff7c64"
                  outlineWidth={1}
                  zIndex={998}
                />
              );
            })}

          {/* 우리팀 클러스터링 */}
          {zoomLevel > 12 &&
            zoomLevel <= 15 &&
            selectedTileView === 'team' &&
            oneTeamClusterData?.tileClusterGetResponseList?.map(cluster => (
              <NaverMapMarkerOverlay
                key={`marker-${cluster.zodiacId}-${cluster.geoPoint.lat}-${cluster.geoPoint.lng}`}
                latitude={cluster.geoPoint.lat}
                longitude={cluster.geoPoint.lng}
                width={70}
                height={70}>
                <View
                  key={`${cluster.zodiacId}`}
                  collapsable={false}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: getColorByZodiacId(zodiacId || 1),
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 4, // 이미지와 숫자 간격
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      {cluster.count}
                    </Text>
                  </View>

                  <Image
                    source={getZodiacImage(cluster.zodiacId)}
                    style={{width: 44, height: 44}}
                    resizeMode="contain"
                  />
                </View>
              </NaverMapMarkerOverlay>
            ))}

          {/* 팀별 타일 */}
          {zoomLevel > 15 &&
            selectedTileView === 'all' &&
            tileData?.tileGetResponseList
              ?.filter(tile => tile.geoHash !== null)
              .map(tile => {
                const {sw, ne, geoHash} = tile;
                const fillColor = getColorByZodiacId(tile.zodiacId);

                const gap = 0.00003;

                return (
                  <NaverMapPolygonOverlay
                    key={geoHash}
                    coords={[
                      {latitude: sw.lat + gap, longitude: sw.lng + gap},
                      {latitude: ne.lat - gap, longitude: sw.lng + gap},
                      {latitude: ne.lat - gap, longitude: ne.lng - gap},
                      {latitude: sw.lat + gap, longitude: ne.lng - gap},
                    ]}
                    color={fillColor + '33'}
                    outlineColor={fillColor + '66'}
                    outlineWidth={2}
                    zIndex={9999}
                  />
                );
              })}

          {/* 팀별 클러스터링 */}
          {zoomLevel > 12 &&
            zoomLevel <= 15 &&
            selectedTileView === 'all' &&
            clusterData?.tileClusterGetResponseList?.map(cluster => (
              <NaverMapMarkerOverlay
                key={`marker-${cluster.zodiacId}-${cluster.geoPoint.lat}-${cluster.geoPoint.lng}`}
                latitude={cluster.geoPoint.lat}
                longitude={cluster.geoPoint.lng}
                width={70}
                height={70}>
                <View
                  key={`${cluster.zodiacId}`}
                  collapsable={false}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: getColorByZodiacId(cluster.zodiacId),
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      {cluster.count}
                    </Text>
                  </View>

                  <Image
                    source={getZodiacImage(cluster.zodiacId)}
                    style={{width: 44, height: 44}}
                    resizeMode="contain"
                  />
                </View>
              </NaverMapMarkerOverlay>
            ))}
        </StyledNaverMapView>
      )}

      {/* 슬라이드 버튼 */}
      <RunningStatsButton onClick={() => setShowStats(true)} />

      {/* 타이머 */}
      <RunningTimer tileCnt={visitedTiles.length} />

      {/* 슬라이드 */}
      {showStats && (
        <RunningInfoSlide
          onClose={() => setShowStats(false)}
          setIsPaused={setIsPaused}
          isPaused={isPaused}
          tileCnt={visitedTiles.length}
        />
      )}

      {/* 타일 보기 버튼 */}
      <RunningSettingsButton
        onClick={() => setShowSettings(true)}
        selectedTileView={selectedTileView}
      />

      {/* 타일 보기 모달 */}
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
