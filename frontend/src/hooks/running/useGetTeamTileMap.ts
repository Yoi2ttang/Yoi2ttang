"use client"

import { useQuery } from "@tanstack/react-query"
import { getTeamTileMap } from "@/services/tile/api"
import { Coordinates } from "@/types/map/navermaps"

interface useGetTeamTileMapProps {
  center: Coordinates
}

const useGetTeamTileMap = ({ center }: useGetTeamTileMapProps) => {
  return useQuery({
    queryKey: ["teamTileMap", center],
    queryFn: () => getTeamTileMap(center),
    staleTime: 1000 * 60,
  })
}

export default useGetTeamTileMap
