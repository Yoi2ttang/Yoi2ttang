"use client"

import { getCoursePreview } from "@/services/course/api"
import { useQuery } from "@tanstack/react-query"

const useGetCoursePreview = () => {
  return useQuery({
    queryKey: ["course-preview"],
    queryFn: getCoursePreview,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
  })
}

export default useGetCoursePreview
