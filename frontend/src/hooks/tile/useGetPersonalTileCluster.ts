import { getPersonalTileMapCluster } from "@/services/tile/api"
import { useMutation } from "@tanstack/react-query"

interface useGetPersonalTileClusterProps {
  memberId: string
}

const useGetPersonalTileCluster = ({
  memberId,
}: useGetPersonalTileClusterProps) => {
  return useMutation({
    mutationKey: ["getPersonalTileCluster", memberId],
    mutationFn: (params: {
      localDate: string
      lat: number
      lng: number
      zoomLevel: number
    }) => getPersonalTileMapCluster(params),
  })
}

export default useGetPersonalTileCluster
