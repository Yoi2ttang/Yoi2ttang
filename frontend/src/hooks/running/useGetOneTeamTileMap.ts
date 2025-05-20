"use client"

import { getOneTeamTileMap } from "@/services/tile/api"
import { Coordinates } from "@/types/map/navermaps"
import { useQuery } from "@tanstack/react-query"

interface useGetOneTeamTileMapProps {
  zodiacId: number
  sw: Coordinates
  ne: Coordinates
}

const useGetOneTeamTileMap = ({
  zodiacId,
  sw,
  ne,
}: useGetOneTeamTileMapProps) => {
  return useQuery({
    queryKey: ["oneTeamTileMap", zodiacId, sw, ne],
    queryFn: () =>
      getOneTeamTileMap(zodiacId, {
        swLat: sw.lat,
        swLng: sw.lng,
        neLat: ne.lat,
        neLng: ne.lng,
      }),
    staleTime: 1000 * 60,
  })
}

export default useGetOneTeamTileMap
