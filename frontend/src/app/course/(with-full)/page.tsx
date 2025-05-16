import PinIcon from "@/assets/icons/course/pin-icon.svg"
import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import Carousel from "@/components/common/Carousel"
import Section from "@/components/common/Section"
import CourseCard from "@/components/course/CourseCard"
import CourseCarouselItem from "@/components/course/CourseCarouselItem"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const CoursePage = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-title-md">길을 따라 달려 보아요!</h1>

      <Section
        title={
          <div className="text-title-sm flex">
            <p className="line-clamp-1 break-all">
              <span className="text-yoi-500">WWWWWWWWWWWWWWWW</span>
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
              title="한강 러닝 코스"
              distance={4.3}
              progress={100 - 33 * index}
              className="w-full"
            />
          ))}
        </Carousel>
      </Section>

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
          <CourseCard
            courseId={1}
            title="한강 러닝 코스"
            distance={4.3}
            className="h-44"
          />
          <CourseCard
            courseId={2}
            title="한강 러닝 코스"
            distance={4.3}
            className="h-44"
            completedDate={new Date()}
          />
          <CourseCard
            courseId={3}
            title="한강 러닝 코스"
            distance={4.3}
            className="h-44"
            completedDate={new Date()}
          />
          <CourseCard
            courseId={4}
            title="한강 러닝 코스"
            distance={4.3}
            className="h-44"
            completedDate={new Date()}
          />
        </div>
      </Section>

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
          <CourseCard
            courseId={1}
            title="한강 러닝 코스"
            distance={4.3}
            className="h-44"
          />
          <CourseCard
            courseId={2}
            title="한강 러닝 코스"
            distance={4.3}
            className="h-44"
          />
          <CourseCard
            courseId={3}
            title="한강 러닝 코스"
            distance={4.3}
            className="h-44"
          />
          <CourseCard
            courseId={4}
            title="한강 러닝 코스"
            distance={4.3}
            className="h-44"
          />
        </div>
      </Section>
    </div>
  )
}

export default CoursePage
