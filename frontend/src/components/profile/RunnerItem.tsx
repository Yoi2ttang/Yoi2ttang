"use client"

import KakaoProfileImage from "@/assets/images/profile/kakao_profile.jpg"
import { AnimalType } from "@/types/animal"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import AnimalBadge from "../animal-badges/AnimalBadge"
import FollowButton from "./FollowButton"

interface RunnerItemProps {
  targetId: number
  nickname: string
  animalType: AnimalType
  profileImageUrl: string
  isFollow: boolean
}

const RunnerItem = ({
  nickname,
  animalType,
  targetId,
  isFollow,
}: RunnerItemProps) => {
  const [followState, setFollowState] = useState(isFollow)

  return (
    <div className="flex items-center rounded-xl bg-white p-4">
      <div className="flex w-full items-center gap-3">
        <Image
          src={KakaoProfileImage}
          alt=""
          width={52}
          height={52}
          className="rounded-full"
        />

        <div className="flex flex-1 flex-col gap-0.5">
          <Link
            href={`/profile/${targetId}`}
            className="line-clamp-1 break-all">
            {nickname}
          </Link>
          <AnimalBadge animal={animalType} />
        </div>

        {targetId && (
          <FollowButton
            targetId={targetId}
            followState={followState}
            onClick={setFollowState}
            className="rounded-lg px-3 py-1"
          />
        )}
      </div>
    </div>
  )
}

export default RunnerItem
