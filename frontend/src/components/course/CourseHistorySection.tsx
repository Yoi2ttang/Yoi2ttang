"use client"

import Carousel from "@/components/common/Carousel"
import Section from "@/components/common/Section"
import CourseCarouselItem from "@/components/course/CourseCarouselItem"
import useGetCourseHistoryPreview from "@/hooks/course/useGetCourseHistoryPreview"
import { getPayload } from "@/lib/auth/util"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Skeleton from "../common/skeleton"

const CourseHistorySection = () => {
  const [nickname, setNickname] = useState("")
  const { data, isLoading, isError } = useGetCourseHistoryPreview()
  const isEmpty = !data || data.length === 0

  useEffect(() => {
    const payload = getPayload()
    if (payload) {
      setNickname(payload.nickname)
    }
  }, [])

  return (
    <Section
      title={
        <div className="text-title-sm flex">
          <p className="text-yoi-500 line-clamp-1 break-all">{nickname}</p>
          <p className="shrink-0">님이 달렸던 코스</p>
        </div>
      }
      supplement={
        !isEmpty && (
          <Link
            href={`/course/history`}
            className="ml-2 flex cursor-pointer items-center gap-0.5">
            <ChevronRight className="size-5 text-neutral-300" />
          </Link>
        )
      }>
      {isLoading ? (
        Array.from({ length: 1 }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full shrink-0" />
        ))
      ) : isEmpty ? (
        <div className="flex items-center justify-center rounded-xl bg-white py-6 text-neutral-300">
          {isError ? (
            <p>잠시 후 다시 시도해 주세요</p>
          ) : (
            <>
              <p className="text-center">
                진행했던 코스가 없어요 <br />
                코스를 달려보세요!
              </p>
            </>
          )}
        </div>
      ) : (
        <Carousel
          loop={true}
          autoplay={true}
          autoplayDelay={5000}
          scrollCount={data.length}>
          {data.map((item) => (
            <CourseCarouselItem
              key={item.courseId}
              data={item}
              className="mr-4 w-full"
            />
          ))}
        </Carousel>
      )}
    </Section>
  )
}

export default CourseHistorySection
