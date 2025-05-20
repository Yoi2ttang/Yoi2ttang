import { getCourseHistories } from "@/services/course/api"
import { useSearchParams } from "next/navigation"
import useInfiniteScroll from "../common/useInfiniteScroll"

const useSearchCourseHistories = () => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get("keyword")

  const fetchFn = async (pageParam: number) => {
    const response = await getCourseHistories({
      keyword: keyword as string,
      pageToken: pageParam,
    })
    return response
  }

  return useInfiniteScroll({
    queryKey: ["course-histories", keyword],
    queryFn: ({ pageParam = 0 }) => fetchFn(Number(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageToken : undefined,
  })
}

export default useSearchCourseHistories
