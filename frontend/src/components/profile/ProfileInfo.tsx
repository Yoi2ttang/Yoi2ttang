import AnimalBadge from "@/components/animal-badges//AnimalBadge"
import { AnimalType } from "@/types/animal"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Button from "../common/Button"
import Image from "next/image"
import { ProfileResponse } from "@/types/member"

interface ProfileInfoProps {
  data: ProfileResponse
}

const ProfileInfo = async ({ data }: ProfileInfoProps) => {
  const {
    nickname,
    profileImageUrl,
    zordiacName,
    stateMessage,
    followerCount,
    followingCount,
  } = data

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6">
      <div className="flex items-center gap-4">
        <Image
          src={profileImageUrl}
          alt=""
          width={60}
          height={60}
          className="rounded-full"
        />

        <div className="flex flex-1 flex-col gap-1">
          <p className="text-lg">{nickname}</p>
          <AnimalBadge animal={zordiacName as AnimalType} />
        </div>

        <div className="cursor-pointer self-start">
          <ChevronRight className="size-5 text-neutral-300" />
        </div>
      </div>

      <div className="leading-[1.6]">{stateMessage}</div>

      <div className="flex">
        <Link
          href={`/profile/${nickname}/followers`}
          className="flex-1 cursor-pointer text-center">
          <p className="text-neutral-800">팔로워</p>
          <p className="text-lg">{followerCount}</p>
        </Link>

        <div className="w-0.5 bg-neutral-50" />

        <Link
          href={`/profile/${nickname}/followings`}
          className="flex-1 cursor-pointer text-center">
          <p className="text-neutral-800">팔로잉</p>
          <p className="text-lg">{followingCount}</p>
        </Link>
      </div>

      <Button className="w-full">팔로우</Button>
    </div>
  )
}

export default ProfileInfo
