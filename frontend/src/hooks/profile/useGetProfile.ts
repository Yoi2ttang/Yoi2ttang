import { getProfile } from "@/services/member/api"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

const useGetProfile = () => {
  const { memberId } = useParams()

  return useQuery({
    queryKey: ["profile", memberId],
    queryFn: () => getProfile(Number(memberId)),
    // 팔로워, 팔로잉과 같이 자주 변하는 데이터가 포함돼 있으므로 캐싱을 하지 않는다.
  })
}

export default useGetProfile
