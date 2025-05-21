import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {getOneTeamTileMapNew} from '../../services/running/api';
import {Coordinates} from '../../types/map';

interface useGetOneTeamTileMapNewProps {
  zodiacId: number;
  sw: Coordinates;
  ne: Coordinates;
}

const useGetOneTeamTileMapNew = ({
  zodiacId,
  sw,
  ne,
}: useGetOneTeamTileMapNewProps) => {
  return useQuery({
    queryKey: ['teamTileMap', zodiacId, sw, ne],
    queryFn: () =>
      getOneTeamTileMapNew({
        zodiacId: zodiacId,
        swLat: sw.lat,
        swLng: sw.lng,
        neLat: ne.lat,
        neLng: ne.lng,
      }),
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });
};

export default useGetOneTeamTileMapNew;
