import PinIcon from "@/assets/icons/course/pin-icon.svg"
import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import Carousel from "@/components/common/Carousel"
import Section from "@/components/common/Section"
import QuestCard from "@/components/quest/QuestCard"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const CoursePage = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="text-title-md">주어진 길을 신나게 달려보자!</div>

      <Section
        title={
          <h1 className="text-title-sm">
            <span className="text-yoi-500">타이거</span>님이 진행했던 코스
          </h1>
        }>
        <Carousel>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex w-full shrink-0 cursor-pointer gap-4 rounded-xl bg-white p-4">
              <div className="size-24 rounded-xl bg-neutral-200" />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h1 className="text-title-sm line-clamp-1 break-all">
                    한강 러닝 코스
                  </h1>
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <RouteIcon className="size-3 shrink-0" />
                    <p className="text-neutral-500">4.3km</p>
                  </div>
                </div>

                <div>
                  <p className="text-caption">완성도: 70%</p>
                  <div className="bg-yoi-500 h-3 w-24 rounded-full" />
                </div>
              </div>
            </div>
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
        className="rounded-xl bg-white p-4">
        <div className="grid grid-cols-2 gap-4">
          <QuestCard title="한강 러닝 코스" distance={4.3} showLables={false}>
            <div className="h-16 w-full rounded-t-xl bg-neutral-200" />
          </QuestCard>
          <QuestCard title="한강 러닝 코스" distance={4.3} showLables={false}>
            <div className="h-16 w-full rounded-t-xl bg-neutral-200" />
          </QuestCard>
          <QuestCard title="한강 러닝 코스" distance={4.3} showLables={false}>
            <div className="h-16 w-full rounded-t-xl bg-neutral-200" />
          </QuestCard>
          <QuestCard title="한강 러닝 코스" distance={4.3} showLables={false}>
            <div className="h-16 w-full rounded-t-xl bg-neutral-200" />
          </QuestCard>
        </div>
      </Section>

      <Section
        title={
          <div className="flex gap-2">
            <RouteIcon className="text-yoi-500 size-6" />
            <p className="text-title-sm">이 코스는 어떠세요?</p>
          </div>
        }
        supplement={
          <Link
            href={`/course/all`}
            className="flex cursor-pointer items-center gap-0.5">
            <p className="text-caption text-neutral-400">전체 보기</p>
            <ChevronRight className="size-5 text-neutral-300" />
          </Link>
        }
        className="rounded-xl bg-white p-4">
        <div className="grid grid-cols-2 gap-4">
          <QuestCard title="한강 러닝 코스" distance={4.3} showLables={false}>
            <div className="h-16 w-full rounded-t-xl bg-neutral-200" />
          </QuestCard>
          <QuestCard title="한강 러닝 코스" distance={4.3} showLables={false}>
            <div className="h-16 w-full rounded-t-xl bg-neutral-200" />
          </QuestCard>
          <QuestCard title="한강 러닝 코스" distance={4.3} showLables={false}>
            <div className="h-16 w-full rounded-t-xl bg-neutral-200" />
          </QuestCard>
          <QuestCard title="한강 러닝 코스" distance={4.3} showLables={false}>
            <div className="h-16 w-full rounded-t-xl bg-neutral-200" />
          </QuestCard>
        </div>
      </Section>
    </div>
  )
}

export default CoursePage
