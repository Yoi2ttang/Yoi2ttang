"use client"

import StarIcon from "@/assets/icons/course/star-icon.svg"
import { useState } from "react"
import { cn } from "@/lib/utils"
import useCourseBookmark from "@/hooks/course/useCourseBookmark"

interface CourseBookmarkButtonProps {
  courseId: number
  isBookmarked: boolean
}

const CourseBookmarkButton = ({
  courseId,
  isBookmarked,
}: CourseBookmarkButtonProps) => {
  const [bookmarkState, setBookmarkState] = useState(isBookmarked)
  const { mutate } = useCourseBookmark({
    onChange: setBookmarkState,
  })

  const handleClick = () => {
    mutate({ courseId, bookmarkState })
  }

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
