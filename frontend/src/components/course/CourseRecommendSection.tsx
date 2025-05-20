"use client"

import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import Section from "@/components/common/Section"
import CourseCard from "@/components/course/CourseCard"
import useGetCoursePreview from "@/hooks/course/useGetCoursePreview"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Skeleton from "../common/skeleton"

const CourseRecommendSection = () => {
  const { data, isLoading, isError } = useGetCoursePreview()
  const isEmpty = !data || data.length === 0

  return (
    <Section
      title={
        <div className="flex gap-2">
          <RouteIcon className="text-yoi-500 size-6" />
          <p className="text-title-sm">코스 둘러보기</p>
        </div>
      }
      supplement={
        !isEmpty && (
          <Link
            href={`/course/search`}
            className="flex cursor-pointer items-center gap-0.5">
            <p className="text-caption text-neutral-400">전체 보기</p>
            <ChevronRight className="size-5 text-neutral-300" />
          </Link>
        )
      }
      className="rounded-xl bg-white p-6">
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-44" />
          ))}
        </div>
      ) : isEmpty ? (
        <div className="rounded-xl bg-white py-4 text-center text-neutral-300">
          {isError ? (
            <p>잠시 후 다시 시도해 주세요</p>
          ) : (
            <>
              <p>등록된 코스가 없어요</p>
              <p>코스를 등록해 보세요!</p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {data.map((item) => (
            <CourseCard key={item.courseId} data={item} className="h-44" />
          ))}
        </div>
      )}
    </Section>
  )
}

export default CourseRecommendSection
