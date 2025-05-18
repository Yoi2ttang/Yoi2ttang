import { getTeamTileMapCluster } from "@/services/tile/api"
import { useMutation } from "@tanstack/react-query"

const useGetTeamTileCluster = () => {
  return useMutation({
    mutationKey: ["teamTileCluster"],
    mutationFn: (params: { lat: number; lng: number; zoomLevel: number }) =>
      getTeamTileMapCluster(params),
  })
}

export default useGetTeamTileCluster
