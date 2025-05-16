import FireIcon from "@/assets/icons/course/fire-icon.svg"
import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import TimeIcon from "@/assets/icons/profile/time-icon.svg"
import TempMapImage from "@/assets/images/course/temp_map.png"
import Image from "next/image"
import Section from "../common/Section"

interface CourseInfoSectionProps {
  distance: number
  calorie: number
  time: number
}

const CourseInfoSection = ({
  distance,
  calorie,
  time,
}: CourseInfoSectionProps) => {
  return (
    <Section title="한강 러닝 코스" className="rounded-xl bg-white p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-yoi-500 text-title-sm flex items-center gap-3">
            <RouteIcon className="size-6" />
            <p className="w-24">거리</p>
            <p className="font-normal text-black">{distance}km</p>
          </div>

          <div className="text-yoi-500 text-title-sm flex items-center gap-3">
            <FireIcon className="size-6" />
            <p className="w-24">칼로리</p>
            <p className="font-normal text-black">{calorie}kcal</p>
          </div>

          <div className="text-yoi-500 text-title-sm flex items-center gap-3">
            <TimeIcon className="size-6" />
            <p className="w-24">소요 시간</p>
            <p className="font-normal text-black">약 {time}분</p>
          </div>
        </div>

        <div className="relative h-72 w-full">
          <Image
            src={TempMapImage}
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </Section>
  )
}

export default CourseInfoSection
