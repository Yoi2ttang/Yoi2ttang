import AnimalBadge from "@/components/animal-badges//AnimalBadge"
import { checkSelf } from "@/lib/auth/util"
import { AnimalType } from "@/types/animal"
import { ProfileResponse } from "@/types/member"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Button from "../common/Button"

interface ProfileInfoProps {
  data: ProfileResponse
}

const ProfileInfo = async ({ data }: ProfileInfoProps) => {
  const {
    nickname,
    profileImageUrl,
    zodiacName,
    stateMessage,
    followerCount,
    followingCount,
  } = data
  const isMe = await checkSelf(nickname)

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6">
      <div className="flex items-center gap-4">
        <Image
          src={profileImageUrl}
          alt=""
          width={60}
          height={60}
          className="size-15 rounded-full border border-neutral-100 object-cover"
        />

        <div className="flex flex-1 flex-col gap-1">
          <p className="line-clamp-1 text-lg break-all">{nickname}</p>
          <AnimalBadge animal={zodiacName as AnimalType} />
        </div>

        <Link
          href={`/profile/${nickname}/setting`}
          className="cursor-pointer self-start">
          <ChevronRight className="size-5 text-neutral-300" />
        </Link>
      </div>

      <div className="leading-[1.6] break-all">{stateMessage}</div>

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

      {isMe && <Button className="w-full">팔로우</Button>}
    </div>
  )
}

export default ProfileInfo
