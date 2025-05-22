"use client"

import PinIcon from "@/assets/icons/course/pin-icon.svg"
import CourseCard from "@/components/course/CourseCard"
import useGetCourseBookmarkPreview from "@/hooks/course/useGetCourseBookmarkPreview"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Section from "../common/Section"
import Skeleton from "../common/skeleton"

const CourseBookmarkSection = () => {
  const { data, isLoading, isError } = useGetCourseBookmarkPreview()
  const isEmpty = !data || data.length === 0

  return (
    <Section
      title={
        <div className="flex items-center gap-2">
          <PinIcon className="text-yoi-500 size-6" />
          <h1 className="text-title-sm">내가 찜한 코스</h1>
        </div>
      }
      supplement={
        !isEmpty && (
          <Link
            href={`/course/bookmark`}
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
              <p>찜한 코스가 없어요</p>
              <p>마음에 드는 코스를 추가해 보세요!</p>
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

export default CourseBookmarkSection
