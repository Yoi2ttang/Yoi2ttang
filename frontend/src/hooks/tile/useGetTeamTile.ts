"use client"

import { getOneTeamTileMap } from "@/services/tile/api"
import { useMutation } from "@tanstack/react-query"

const useGetTeamTile = () => {
  return useMutation({
    mutationKey: ["teamTileMap"],
    mutationFn: ({
      zodiacId,
      lat,
      lng,
    }: {
      zodiacId: number
      lat: number
      lng: number
    }) => getOneTeamTileMap(zodiacId, { lat, lng }),
  })
}

export default useGetTeamTile
