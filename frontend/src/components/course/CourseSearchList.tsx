"use client"

import useSearchCourses from "@/hooks/course/useSearchCourses"
import CourseCard from "@/components/course/CourseCard"
import Skeleton from "@/components/common/skeleton"
import { CoursePaginationResponse } from "@/types/course/course.type"

const CourseSearchList = () => {
  const { targetRef, data, isLoading, isFetchingNextPage } = useSearchCourses()
  const isEmpty = !data?.pages.some(
    (page: CoursePaginationResponse) => page?.data.length > 0,
  )

  return (
    <div className="flex flex-1 flex-col gap-4">
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-64 w-full" />
        ))
      ) : isEmpty ? (
        <p className="text-center text-neutral-300">일치하는 결과가 없어요</p>
      ) : (
        <>
          {data?.pages.map((page: CoursePaginationResponse) =>
            page.data.map((course) => (
              <CourseCard
                key={course.courseId}
                data={course}
                className="h-64 w-full"
              />
            )),
          )}

          {isFetchingNextPage ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <div ref={targetRef} />
          )}
        </>
      )}
    </div>
  )
}

export default CourseSearchList
