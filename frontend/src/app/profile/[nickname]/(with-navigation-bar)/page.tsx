import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import BlockIcon from "@/assets/icons/profile/block-icon.svg"
import SettingIcon from "@/assets/icons/profile/setting-icon.svg"
import TimeIcon from "@/assets/icons/profile/time-icon.svg"
import AnimalBadge from "@/components/animal-badges/AnimalBadge"
import Button from "@/components/common/Button"
import Section from "@/components/common/Section"
import { ChevronRight, SearchIcon } from "lucide-react"
import Link from "next/link"

const ProfilePage = () => {
  return (
    <div>
      {/* 프로필 헤더 */}
      <div className="flex items-center justify-between p-4">
        <p className="text-title-md flex-1">프로필</p>

        <div className="flex gap-4">
          <Link href="/profile/search" className="size-6 cursor-pointer">
            <SearchIcon className="size-full stroke-neutral-800" />
          </Link>

          <Link href="/setting" className="size-6 cursor-pointer">
            <SettingIcon className="size-full stroke-neutral-800" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-4">
        {/* 프로필 자기소개 */}
        <div className="flex flex-col gap-6 rounded-2xl bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="size-15 rounded-full bg-neutral-200" />

            <div className="flex flex-1 flex-col gap-1">
              <p className="text-lg">ErOI거</p>
              <AnimalBadge animal="tiger" />
            </div>

            <Link
              href="/profile/ErOI거/setting"
              className="cursor-pointer self-start">
              <ChevronRight className="size-5 text-neutral-300" />
            </Link>
          </div>

          <div className="leading-[1.6]">
            가나다라맙소사 상태 메시지는 최대 64자까지 입력이 가능합니다. 그래서
            지금까지 몇 자인지 한 번 계산해 보도록 하
          </div>

          <div className="flex">
            <Link
              href={`/profile/ErOI거/followers`}
              className="flex-1 cursor-pointer text-center">
              <p className="text-neutral-800">팔로워</p>
              <p className="text-lg">1,024</p>
            </Link>

            <div className="w-0.5 bg-neutral-50" />

            <Link
              href={`/profile/ErOI거/followings`}
              className="flex-1 cursor-pointer text-center">
              <p className="text-neutral-800">팔로잉</p>
              <p className="text-lg">324</p>
            </Link>
          </div>

          <Button className="w-full">팔로우</Button>
        </div>

        {/* 러닝 기록 */}
        <Section
          title="러닝 기록"
          supplement={<ChevronRight className="size-5 text-neutral-300" />}
          className="rounded-2xl bg-white p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <TimeIcon className="text-yoi-500 size-10" />
              <div className="flex flex-col">
                <p className="text-yoi-500 font-semibold">지금까지 달린 시간</p>
                <p>9일 22시간 23분 12초</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <RouteIcon className="text-yoi-500 size-10" />
              <div className="flex flex-col">
                <p className="text-yoi-500 font-semibold">지금까지 달린 거리</p>
                <p>1,235km</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <BlockIcon className="text-yoi-500 size-10" />
              <div className="flex flex-col">
                <p className="text-yoi-500 font-semibold">
                  지금까지 밟은 타일 수
                </p>
                <p>2,224개</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 완료한 퀘스트 */}
        <Section
          title="완료한 퀘스트"
          supplement={<ChevronRight className="size-5 text-neutral-300" />}
          className="rounded-2xl bg-white p-6">
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-32 shrink-0 rounded-xl border border-neutral-100">
                <div className="h-20 w-full rounded-t-xl bg-neutral-200" />
                <div className="p-2">
                  <p className="line-clamp-1">한강 러닝 코스</p>
                  <p className="text-caption text-neutral-600">4.3km</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}

export default ProfilePage
