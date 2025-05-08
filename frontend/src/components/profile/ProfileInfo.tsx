import AnimalBadge from "@/components/animal-badges//AnimalBadge"
import { AnimalType } from "@/types/animal"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Button from "../common/Button"

interface ProfileInfoProps {
  nickname: string
  animalType: AnimalType
  stateMessage: string
}

const ProfileInfo = ({
  nickname,
  animalType,
  stateMessage,
}: ProfileInfoProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="size-15 rounded-full bg-neutral-200" />

        <div className="flex flex-1 flex-col gap-1">
          <p className="text-lg">{nickname}</p>
          <AnimalBadge animal={animalType} />
        </div>

        <div className="cursor-pointer self-start">
          <ChevronRight className="size-5 text-neutral-300" />
        </div>
      </div>

      <div className="leading-[1.6]">{stateMessage}</div>

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
  )
}

export default ProfileInfo
