"use client"

import { updateBookmark } from "@/services/course/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UseUpdateCourseBookmarkProps {
  onChange: (bookmarkState: boolean) => void
}

const useUpdateCourseBookmark = ({
  onChange,
}: UseUpdateCourseBookmarkProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ courseId }: { courseId: number; bookmarkState: boolean }) =>
      updateBookmark(courseId),
    onSuccess: async (_, variables) => {
      onChange(!variables.bookmarkState)

      // 추후에 코스 페이지를 다시 들어갈 경우, 현재 북마크 결과가 반영되도록 캐시를 무효화
      queryClient.invalidateQueries({
        queryKey: ["course-bookmark-preview"],
      })
    },
  })
}

export default useUpdateCourseBookmark
