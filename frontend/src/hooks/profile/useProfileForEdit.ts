import { getProfileForEdit } from "@/services/members/api"
import { useQuery } from "@tanstack/react-query"

const useProfileForEdit = () => {
  return useQuery({
    queryKey: ["profileForEdit"],
    queryFn: () => getProfileForEdit(),
    staleTime: 1000 * 60 * 60 * 24, // 프로필을 수정하면 refetch를 수행해야 한다.
  })
}

export default useProfileForEdit
