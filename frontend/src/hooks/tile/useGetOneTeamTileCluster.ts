import { getOneTeamTileMapCluster } from "@/services/tile/api"
import { useMutation } from "@tanstack/react-query"

interface useGetOneTeamTileClusterProps {
  zodiacId: number
}

// 특정 팀 점령 지도 클러스터 확인
const useGetOneTeamTileCluster = ({
  zodiacId,
}: useGetOneTeamTileClusterProps) => {
  return useMutation({
    mutationKey: ["getOneTeamTileCluster", zodiacId],
    mutationFn: ({
      lat,
      lng,
      zoomLevel,
    }: {
      lat: number
      lng: number
      zoomLevel: number
    }) => getOneTeamTileMapCluster(zodiacId, { lat, lng, zoomLevel }),
  })
}
export default useGetOneTeamTileCluster
