import { getTeamTileMap } from "@/services/tile/api"
import { useMutation } from "@tanstack/react-query"

// 전체 점령 지도 확인 (팀 상관없이 좌쵸 근처에 대한 타일의 정보 가져옴)
const useGetAllTiles = () => {
  return useMutation({
    mutationKey: ["allTiles"],
    mutationFn: (params: {
      swLat: number
      swLng: number
      neLat: number
      neLng: number
    }) => getTeamTileMap(params),
  })
}

export default useGetAllTiles
