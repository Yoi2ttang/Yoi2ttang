import { getPersonalTileMap } from "@/services/tile/api"
import { useMutation } from "@tanstack/react-query"

interface useGetPersonalTileProps {
  memberId: string
}

const useGetPersonalTile = ({ memberId }: useGetPersonalTileProps) => {
  return useMutation({
    mutationKey: ["getPersonalTile"],
    mutationFn: () => getPersonalTileMap(memberId),
  })
}

export default useGetPersonalTile
