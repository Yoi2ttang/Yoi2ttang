import {useDebounce} from '../useDebounce';
import {useQuery} from '@tanstack/react-query';
import {getOneTeamTileCluster} from '../../services/running/api';
import {Coordinates} from '../../types/map';
import {keepPreviousData} from '@tanstack/react-query';

interface useGetOneTeamTileClusterProps {
  zodiacId: number;
  center: Coordinates;
  zoomLevel: number;
}

const useGetOneTeamTileCluster = ({
  zodiacId,
  center,
  zoomLevel,
}: useGetOneTeamTileClusterProps) => {
  const lat = center?.lat;
  const lng = center?.lng;
  const roundedZoom = Math.floor(zoomLevel);

  // 디바운싱 적용
  const debouncedLat = useDebounce(lat, 300);
  const debouncedLng = useDebounce(lng, 300);
  const debouncedZoom = useDebounce(roundedZoom, 300);

  return useQuery({
    queryKey: [
      'oneTeamTileCluster',
      zodiacId,
      debouncedLat,
      debouncedLng,
      debouncedZoom,
    ],
    queryFn: () =>
      getOneTeamTileCluster({
        zodiacId,
        lat: debouncedLat,
        lng: debouncedLng,
        zoomLevel: debouncedZoom,
      }),
    enabled:
      zodiacId !== null &&
      debouncedLat !== undefined &&
      debouncedLng !== undefined &&
      debouncedZoom !== undefined,
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });
};

export default useGetOneTeamTileCluster;
