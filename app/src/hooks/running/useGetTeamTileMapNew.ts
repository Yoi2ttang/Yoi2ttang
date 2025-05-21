import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {getTeamTileMapNew} from '../../services/running/api';
import {Coordinates} from '../../types/map';

interface useGetTeamTileMapNewProps {
  sw: Coordinates;
  ne: Coordinates;
}

interface Options {
  enabled?: boolean;
}

const useGetTeamTileMapNew = (
  {sw, ne}: useGetTeamTileMapNewProps,
  options?: Options,
) => {
  return useQuery({
    queryKey: ['teamTileMap', sw, ne],
    queryFn: () =>
      getTeamTileMapNew({
        swLat: sw.lat,
        swLng: sw.lng,
        neLat: ne.lat,
        neLng: ne.lng,
      }),
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
    enabled: options?.enabled ?? true, // ✅ enabled 설정 가능
  });
};

export default useGetTeamTileMapNew;
