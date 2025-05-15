"use client"

import PinIcon from "@/assets/icons/course/pin-icon.svg"
import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import Carousel from "@/components/common/Carousel"
import Section from "@/components/common/Section"
import QuestCard from "@/components/quest/QuestCard"
import { Progress } from "@/components/ui/progress"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const CoursePage = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-title-md">길을 따라 달려 볼까요!</h1>

      <Section
        title={
          <div className="text-title-sm w-11/12">
            <div className="flex">
              <p className="line-clamp-1 break-all">
                <span className="text-yoi-500">
                  WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
                </span>
              </p>
              <p className="shrink-0">님이</p>
            </div>
            <p>달렸던 코스</p>
          </div>
        }
        supplement={
          <Link
            href={`/course/history`}
            className="flex cursor-pointer items-center gap-0.5">
            <p className="text-caption text-neutral-400">전체 보기</p>
            <ChevronRight className="size-5 text-neutral-300" />
          </Link>
        }>
        <Carousel
          loop={true}
          autoplay={true}
          autoplayDelay={5000}
          scrollCount={3}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex w-full shrink-0 cursor-pointer gap-4 rounded-xl bg-white p-4">
              <div className="size-28 rounded-lg bg-neutral-200" />
              <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                  <h1 className="line-clamp-1 text-lg break-all">
                    한강 러닝 코스
                  </h1>

                  <p className="text-neutral-500">4.3km</p>
                </div>

                <div className="relative">
                  <Progress
                    value={60}
                    className="bg-neutral-200"
                    indicatorClassName="bg-yoi-500 rounded-full"
                  />
                  <p className="text-caption text-yoi-500 font-medium">
                    60% 달렸어요!
                  </p>
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
            href={`/course/search`}
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
