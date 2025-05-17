import { getCourses } from "@/services/course/api"
import { useParams } from "next/navigation"
import useInfiniteScroll from "../common/useInfiniteScroll"

const useSearchCourses = () => {
  const { keyword } = useParams()

  const fetchFn = async (pageParam: number) => {
    const response = await getCourses({
      keyword: keyword as string,
      pageToken: pageParam,
    })
    return response.data
  }

  return useInfiniteScroll({
    queryKey: ["courses", keyword],
    queryFn: ({ pageParam = 0 }) => fetchFn(Number(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageToken : undefined,
    enabled: !!keyword,
  })
}

export default useSearchCourses
