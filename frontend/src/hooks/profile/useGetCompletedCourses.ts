import { getCompletedCourses } from "@/services/member/api"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

const useGetCompletedCourses = () => {
  const { memberId } = useParams()

  return useQuery({
    queryKey: ["completed-courses", memberId],
    queryFn: () => getCompletedCourses(Number(memberId)),
    staleTime: 1000 * 60 * 60 * 24, // 새로운 코스 완료 시, 무효화 할 것
  })
}

export default useGetCompletedCourses
