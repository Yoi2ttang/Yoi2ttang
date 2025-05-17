import Section from "@/components/common/Section"
import Carousel from "@/components/common/Carousel"
import CourseCarouselItem from "@/components/course/CourseCarouselItem"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { getCourseHistoryPreview } from "@/services/course/api-server"

const CourseHistorySection = async () => {
  const { data, isError } = await getCourseHistoryPreview()
  const isEmpty = isError || data.length === 0

  return (
    <Section
      title={
        <div className="text-title-sm flex">
          <p className="line-clamp-1 break-all">
            <span className="text-yoi-500">98년생호랑이</span>
          </p>
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
      {isEmpty ? (
        <div className="flex items-center justify-center rounded-xl bg-white py-6 text-neutral-300">
          {isError ? (
            <p>잠시 후 다시 시도해 주세요</p>
          ) : (
            <>
              <p>진행했던 코스가 없어요</p>
              <p>코스를 시작해 보세요!</p>
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
              courseId={item.courseId}
              title={item.courseName}
              distance={item.distance}
              progress={item.completeRate}
              className="mr-4 w-full"
            />
          ))}
        </Carousel>
      )}
    </Section>
  )
}

export default CourseHistorySection
