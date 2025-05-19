import {useQuery} from '@tanstack/react-query';
import {getTeamTileMapCluster} from '../../services/running/api';
import {Coordinates} from '../../types/map';

interface useGetTeamTileMapProps {
  center: Coordinates;
  zoomLevel: number;
}

const useGetTeamTileMapCluster = ({
  center,
  zoomLevel,
}: useGetTeamTileMapProps) => {
  const lat = center?.lat;
  const lng = center?.lng;
  const roundedZoom = Math.round(zoomLevel);

  return useQuery({
    queryKey: ['teamTileMapCluster', lat, lng, roundedZoom],
    queryFn: () =>
      getTeamTileMapCluster({
        lat,
        lng,
        zoomLevel: roundedZoom,
      }),
    staleTime: 1000 * 60,
    enabled: lat !== undefined && lng !== undefined && zoomLevel !== undefined,
  });
};

export default useGetTeamTileMapCluster;
