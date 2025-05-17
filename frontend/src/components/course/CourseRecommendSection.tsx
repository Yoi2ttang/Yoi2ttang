import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import Section from "@/components/common/Section"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import CourseCard from "@/components/course/CourseCard"

const CourseRecommendSection = () => {
  return (
    <Section
      title={
        <div className="flex gap-2">
          <RouteIcon className="text-yoi-500 size-6" />
          <p className="text-title-sm">코스 둘러보기</p>
        </div>
      }
      supplement={
        <Link
          href={`/course/search`}
          className="flex cursor-pointer items-center gap-0.5">
          <p className="text-caption text-neutral-400">전체 보기</p>
          <ChevronRight className="size-5 text-neutral-300" />
        </Link>
      }
      className="rounded-xl bg-white p-6">
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <CourseCard
            key={index}
            courseId={index + 1}
            title={`한강 러닝 코스 ${index + 1}`}
            distance={4.3}
            className="h-44"
          />
        ))}
      </div>
    </Section>
  )
}

export default CourseRecommendSection
