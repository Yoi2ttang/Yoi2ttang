"use client"

import { getCourseHistoryPreview } from "@/services/course/api"
import { useQuery } from "@tanstack/react-query"

const useGetCourseHistoryPreview = () => {
  return useQuery({
    queryKey: ["course-history-preview"],
    queryFn: getCourseHistoryPreview,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
  })
}

export default useGetCourseHistoryPreview
