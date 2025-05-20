"use client"

import { getCourseBookmarkPreview } from "@/services/course/api"
import { useQuery } from "@tanstack/react-query"

const useGetCourseBookmarkPreview = () => {
  return useQuery({
    queryKey: ["course-bookmark-preview"],
    queryFn: () => getCourseBookmarkPreview(),
    staleTime: 1000 * 60 * 60 * 24, // 2시간
  })
}

export default useGetCourseBookmarkPreview
