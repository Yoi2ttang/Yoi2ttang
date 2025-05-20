import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {getTeamTileMapNew} from '../../services/running/api';
import {Coordinates} from '../../types/map';

interface useGetTeamTileMapNewProps {
  sw: Coordinates;
  ne: Coordinates;
}

const useGetTeamTileMapNew = ({sw, ne}: useGetTeamTileMapNewProps) => {
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
  });
};

export default useGetTeamTileMapNew;
