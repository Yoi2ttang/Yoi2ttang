import { getTeamTileMapCluster } from "@/services/tile/api"
import { useMutation } from "@tanstack/react-query"

// 전체 점령 지도 클러스터 확인
const useGetTeamTileCluster = () => {
  return useMutation({
    mutationKey: ["teamTileCluster"],
    mutationFn: (params: { lat: number; lng: number; zoomLevel: number }) =>
      getTeamTileMapCluster(params),
  })
}

export default useGetTeamTileCluster
