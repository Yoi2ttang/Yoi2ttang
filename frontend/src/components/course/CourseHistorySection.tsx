import Section from "@/components/common/Section"
import Carousel from "@/components/common/Carousel"
import CourseCarouselItem from "@/components/course/CourseCarouselItem"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const CourseHistorySection = () => {
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
        <Link
          href={`/course/history`}
          className="ml-2 flex cursor-pointer items-center gap-0.5">
          <ChevronRight className="size-5 text-neutral-300" />
        </Link>
      }>
      <Carousel
        loop={true}
        autoplay={true}
        autoplayDelay={5000}
        scrollCount={3}>
        {Array.from({ length: 3 }).map((_, index) => (
          <CourseCarouselItem
            key={index}
            courseId={index + 1}
            title={`한강 러닝 코스 ${index + 1}`}
            distance={4.3}
            progress={100 - 33 * index}
            className="mr-4 w-full"
          />
        ))}
      </Carousel>
    </Section>
  )
}

export default CourseHistorySection
