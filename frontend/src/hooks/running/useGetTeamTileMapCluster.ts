"use client"

import { useQuery } from "@tanstack/react-query"
import { getTeamTileMapCluster } from "@/services/tile/api"
import { Coordinates } from "@/types/map/navermaps"

interface useGetTeamTileMapProps {
  center: Coordinates
  zoomLevel: number
}

const useGetTeamTileMapCluster = ({
  center,
  zoomLevel,
}: useGetTeamTileMapProps) => {
  return useQuery({
    queryKey: ["teamTileMapCluster", center, zoomLevel],
    queryFn: () =>
      getTeamTileMapCluster({
        lat: center.lat,
        lng: center.lng,
        zoomLevel,
      }),
    staleTime: 1000 * 60,
  })
}

export default useGetTeamTileMapCluster
