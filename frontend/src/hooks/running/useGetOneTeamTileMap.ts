"use client"

import { useQuery } from "@tanstack/react-query"
import { getOneTeamTileMap } from "@/services/tile/api"
import { Coordinates } from "@/types/map/navermaps"

interface useGetOneTeamTileMapProps {
  zodiacId: number
  center: Coordinates
}

const useGetOneTeamTileMap = ({
  zodiacId,
  center,
}: useGetOneTeamTileMapProps) => {
  return useQuery({
    queryKey: ["oneTeamTileMap", zodiacId, center],
    queryFn: () => getOneTeamTileMap(zodiacId, center),
    staleTime: 1000 * 60,
  })
}

export default useGetOneTeamTileMap
