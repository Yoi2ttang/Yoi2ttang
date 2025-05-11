import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import BlockIcon from "@/assets/icons/profile/block-icon.svg"
import TimeIcon from "@/assets/icons/profile/time-icon.svg"
import { ChevronRight } from "lucide-react"
import Section from "../common/Section"
import { ProfileResponse } from "@/types/member"

interface ProfileRunningRecordSectionProps {
  data: ProfileResponse
}

const ProfileRunningRecordSection = ({
  data,
}: ProfileRunningRecordSectionProps) => {
  const { time, totalDistance, totalTileCount } = data

  return (
    <Section
      title="러닝 기록"
      supplement={<ChevronRight className="size-5 text-neutral-300" />}
      className="rounded-2xl bg-white p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <TimeIcon className="text-yoi-500 size-10" />
          <div className="flex flex-col">
            <p className="text-yoi-500 font-semibold">지금까지 달린 시간</p>
            <p>
              {time.hour}시간 {time.minute}분 {time.seconds}초
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <RouteIcon className="text-yoi-500 size-10" />
          <div className="flex flex-col">
            <p className="text-yoi-500 font-semibold">지금까지 달린 거리</p>
            <p>{totalDistance}km</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <BlockIcon className="text-yoi-500 size-10" />
          <div className="flex flex-col">
            <p className="text-yoi-500 font-semibold">지금까지 밟은 타일 수</p>
            <p>{totalTileCount}개</p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ProfileRunningRecordSection
