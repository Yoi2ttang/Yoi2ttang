import { getUsers } from "@/services/members/api"
import { useSearchParams } from "next/navigation"
import useInfiniteScroll from "../common/useInfiniteScroll"

const useSearchUser = () => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get("keyword")

  const fetchFn = async (pageToken: number) => {
    const response = await getUsers({
      keyword: keyword as string,
      pageToken,
    })
    return response.data
  }

  return useInfiniteScroll({
    queryKey: ["search-user", keyword],
    queryFn: ({ pageParam }) => fetchFn(Number(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageToken : undefined,
    enabled: !!keyword,
  })
}

export default useSearchUser
