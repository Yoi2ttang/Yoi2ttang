"use client"

import { updateBookmark } from "@/services/course/api"
import { useMutation } from "@tanstack/react-query"

interface UseCourseBookmarkProps {
  onChange: (bookmarkState: boolean) => void
}

const useCourseBookmark = ({ onChange }: UseCourseBookmarkProps) => {
  return useMutation({
    mutationFn: ({ courseId }: { courseId: number; bookmarkState: boolean }) =>
      updateBookmark(courseId),
    onSuccess: async (_, variables) => {
      onChange(!variables.bookmarkState)

      // 추후에 코스 페이지를 다시 들어갈 경우, 현재 북마크 결과가 반영되도록 캐시를 무효화
      await fetch("/api/revalidate?tag=course-bookmarks-preview")
    },
  })
}

export default useCourseBookmark
