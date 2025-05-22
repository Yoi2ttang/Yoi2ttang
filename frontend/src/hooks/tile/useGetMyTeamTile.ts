"use client"

import { getOneTeamTileMap } from "@/services/tile/api"
import { useMutation } from "@tanstack/react-query"

interface useGetTeamTileProps {
  zodiacId: number
}

// 특정 팀 점령 지도 확인
const useGetMyTeamTile = ({ zodiacId }: useGetTeamTileProps) => {
  return useMutation({
    mutationKey: ["teamTileMap"],
    mutationFn: ({
      swLat,
      swLng,
      neLat,
      neLng,
    }: {
      swLat: number
      swLng: number
      neLat: number
      neLng: number
    }) => getOneTeamTileMap(zodiacId, { swLat, swLng, neLat, neLng }),
  })
}

export default useGetMyTeamTile
