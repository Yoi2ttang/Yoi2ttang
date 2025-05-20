"use client"

import { getClearMemberPreview } from "@/services/course/api"
import { useQuery } from "@tanstack/react-query"

const useGetClearedMemberPreview = (courseId: number) => {
  return useQuery({
    queryKey: ["cleared-member-preview", courseId],
    queryFn: () => getClearMemberPreview(courseId),
    // 다른 유저가 잠깐 사이에 완주할 수 있으므로 캐싱하지 않는다.
  })
}

export default useGetClearedMemberPreview
