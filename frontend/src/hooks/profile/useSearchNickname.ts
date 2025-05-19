"use client"

import { getUserNicknames } from "@/services/member/api"
import useInfiniteScroll from "../common/useInfiniteScroll"

const useSearchNickname = (keyword: string) => {
  const fetchFn = async (pageToken: number) => {
    const response = await getUserNicknames({
      keyword: keyword as string,
      pageToken,
    })
    return response.data
  }

  return useInfiniteScroll({
    queryKey: ["auto-complete-user", keyword],
    queryFn: ({ pageParam }) => fetchFn(Number(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageToken : undefined,
    enabled: !!keyword,
  })
}

export default useSearchNickname
