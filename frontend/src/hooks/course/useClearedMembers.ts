import { getClearedMembers } from "@/services/course/api"
import useInfiniteScroll from "../common/useInfiniteScroll"

const useClearedMembers = (courseId: number) => {
  const fetchFn = async (pageParam: number) => {
    const response = await getClearedMembers({
      courseId,
      pageToken: pageParam,
    })
    return response
  }

  return useInfiniteScroll({
    queryKey: ["cleared-members", courseId],
    queryFn: ({ pageParam = 0 }) => fetchFn(Number(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageToken : undefined,
    enabled: !!courseId,
  })
}

export default useClearedMembers
