import { getTeamTileMap } from "@/services/tile/api"
import { useMutation } from "@tanstack/react-query"

const useGetAllTiles = () => {
  return useMutation({
    mutationKey: ["allTiles"],
    mutationFn: (params: { lat: number; lng: number }) =>
      getTeamTileMap(params),
  })
}

export default useGetAllTiles
