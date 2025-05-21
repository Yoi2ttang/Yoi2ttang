import { getZodiacContributionRanking } from "@/services/ranking/api"
import { PageToken } from "@/types/ranking"
import useInfiniteScroll from "../common/useInfiniteScroll"

const useContributionRanking = (
  zodiacId: number,
  params: {
    date: string
    lastCount?: number
    lastMemberId?: number
    size?: number
  },
) => {
  const fetchFn = async (pageParam: PageToken) => {
    const { lastCount, lastMemberId } = pageParam
    const { date, size } = params
    const response = await getZodiacContributionRanking(zodiacId, {
      date,
      lastCount,
      lastMemberId,
      size,
    })
    return response
  }

  return useInfiniteScroll({
    queryKey: ["contributionRanking"],
    queryFn: ({ pageParam }) => {
      return fetchFn(pageParam as PageToken)
    },
    initialPageParam: { lastCount: null, lastMemberId: null },
    getNextPageParam: (lastPage) =>
      lastPage?.pageInfoArgs.hasNext
        ? lastPage.pageInfoArgs.pageToken
        : undefined,
    enabled: !!zodiacId,
  })
}

export default useContributionRanking
