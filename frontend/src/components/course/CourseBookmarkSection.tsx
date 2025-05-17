import Link from "next/link"
import Section from "../common/Section"
import PinIcon from "@/assets/icons/course/pin-icon.svg"
import { ChevronRight } from "lucide-react"
import CourseCard from "@/components/course/CourseCard"

const CourseBookmarkSection = () => {
  return (
    <Section
      title={
        <div className="flex items-center gap-2">
          <PinIcon className="text-yoi-500 size-6" />
          <h1 className="text-title-sm">내가 찜한 코스</h1>
        </div>
      }
      supplement={
        <Link
          href={`/course/bookmark`}
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

export default CourseBookmarkSection
