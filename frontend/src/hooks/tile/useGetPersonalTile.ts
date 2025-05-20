import { getPersonalTileMap } from "@/services/tile/api"
import { useMutation } from "@tanstack/react-query"

interface useGetPersonalTileProps {
  memberId: string
}

const useGetPersonalTile = ({ memberId }: useGetPersonalTileProps) => {
  return useMutation({
    mutationKey: ["getPersonalTile"],
    mutationFn: (params: { lat: number; lng: number; localDate: string }) =>
      getPersonalTileMap(memberId, params),
  })
}

export default useGetPersonalTile
