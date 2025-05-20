"use client"

import useResizeCourseCreateButton from "@/hooks/course/useResizeCourseCreateButton"
import { cn } from "@/lib/utils"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const CourseCreateButton = () => {
  const router = useRouter()
  const { isExpanded } = useResizeCourseCreateButton()

  const handleClick = () => {
    router.push("/course/create")
  }

  return (
    <button
      className={cn(
        "bg-yoi-500 absolute right-12 bottom-20 flex h-12 cursor-pointer items-center justify-center gap-1 rounded-full shadow-lg transition-all duration-300 ease-in-out",
        isExpanded ? "w-40" : "w-12",
      )}
      onClick={handleClick}>
      <PlusIcon className="size-8 text-white" />
      {isExpanded && (
        <p className="text-title-sm whitespace-nowrap text-white">
          코스 만들기
        </p>
      )}
    </button>
  )
}

export default CourseCreateButton
