"use client"

import Skeleton from "@/components/common/skeleton"
import CourseCard from "@/components/course/CourseCard"
import useGetCompletedCourses from "@/hooks/profile/useGetCompletedCourses"
import { Course } from "@/types/course/course.type"

const CompletedCourseList = () => {
  const { data, isLoading } = useGetCompletedCourses()
  const isEmpty = data?.length === 0

  return (
    <div className="flex flex-1 flex-col gap-4">
      {isLoading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-64 w-full" />
        ))
      ) : isEmpty ? (
        <p className="text-center text-neutral-300">일치하는 결과가 없어요</p>
      ) : (
        data?.map((item: Course) => (
          <CourseCard key={item.courseId} data={item} className="h-64 w-full" />
        ))
      )}
    </div>
  )
}

export default CompletedCourseList
