"use client"

import { useQuery } from "@tanstack/react-query"
import { getOneTeamTileMapCluster } from "@/services/tile/api"
import { Coordinates } from "@/types/map/navermaps"

interface useGetOneTeamTileMapProps {
  zodiacId: number
  center: Coordinates
  zoomLevel: number
}

const useGetOneTeamTileMapCluster = ({
  zodiacId,
  center,
  zoomLevel,
}: useGetOneTeamTileMapProps) => {
  return useQuery({
    queryKey: ["oneTeamTileMapCluster", zodiacId, center, zoomLevel],
    queryFn: () =>
      getOneTeamTileMapCluster(zodiacId, {
        lat: center.lat,
        lng: center.lng,
        zoomLevel,
      }),
    staleTime: 1000 * 60,
  })
}

export default useGetOneTeamTileMapCluster
