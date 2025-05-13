import { getFollowings } from "@/services/members/api"
import { useParams } from "next/navigation"
import useInfiniteScroll from "../common/useInfiniteScroll"

const useFollowingList = () => {
  const { memberId, keyword } = useParams()

  const fetchFn = async (pageToken: number) => {
    const response = await getFollowings({
      targetId: Number(memberId),
      keyword: keyword as string,
      pageToken,
    })
    return response
  }

  return useInfiniteScroll({
    queryKey: ["followings", String(memberId), keyword],
    queryFn: ({ pageParam }) => fetchFn(Number(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageToken : undefined,
    enabled: !!memberId,
  })
}

export default useFollowingList
