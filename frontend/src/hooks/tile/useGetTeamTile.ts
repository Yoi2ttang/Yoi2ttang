"use client"

import { getTeamTileMap } from "@/services/tile/api"
import { Coordinates } from "@/types/map/navermaps"
import { useMutation } from "@tanstack/react-query"

const useGetTeamTile = () => {
  return useMutation({
    mutationKey: ["teamTileMap"],
    mutationFn: ({ lat, lng }: Coordinates) => getTeamTileMap({ lat, lng }),
  })
}

export default useGetTeamTile
