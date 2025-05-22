"use client"

import StarIcon from "@/assets/icons/course/star-icon.svg"
import useUpdateCourseBookmark from "@/hooks/course/useUpdateCourseBookmark"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface CourseBookmarkButtonProps {
  courseId: number
  isBookmarked: boolean
}

const CourseBookmarkButton = ({
  courseId,
  isBookmarked,
}: CourseBookmarkButtonProps) => {
  const [bookmarkState, setBookmarkState] = useState(isBookmarked)
  const { mutate } = useUpdateCourseBookmark({
    onChange: setBookmarkState,
  })

  const handleClick = () => {
    mutate({ courseId, bookmarkState })
  }

  useEffect(() => {
    setBookmarkState(isBookmarked)
  }, [isBookmarked])

  return (
    <button className="cursor-pointer" onClick={handleClick}>
      <StarIcon
        className={cn(
          "size-6",
          bookmarkState ? "text-yoi-500" : "text-neutral-300",
        )}
      />
    </button>
  )
}

export default CourseBookmarkButton
