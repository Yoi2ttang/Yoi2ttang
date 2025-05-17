import { getCourseBookmarks } from "@/services/course/api"
import { useParams } from "next/navigation"
import useInfiniteScroll from "../common/useInfiniteScroll"

const useSearchCourseBookmarks = () => {
  const { keyword } = useParams()

  const fetchFn = async (pageParam: number) => {
    const response = await getCourseBookmarks({
      keyword: keyword as string,
      pageToken: pageParam,
    })
    return response
  }

  return useInfiniteScroll({
    queryKey: ["course-bookmarks", keyword],
    queryFn: ({ pageParam = 0 }) => fetchFn(Number(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageToken : undefined,
    enabled: !!keyword,
  })
}

export default useSearchCourseBookmarks
