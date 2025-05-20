"use client"

import { getTeamTileMap } from "@/services/tile/api"
import { Coordinates } from "@/types/map/navermaps"
import { useQuery } from "@tanstack/react-query"

interface useGetTeamTileMapProps {
  center: Coordinates
}

const useGetTeamTileMap = ({ center }: useGetTeamTileMapProps) => {
  return useQuery({
    queryKey: ["teamTileMap", center],
    queryFn: () =>
      getTeamTileMap({
        swLat: center.lat,
        swLng: center.lng,
        neLat: center.lat,
        neLng: center.lng,
      }),
    staleTime: 1000 * 60,
  })
}

export default useGetTeamTileMap
