"use client"

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
  isFollow: boolean | null
}

const RunnerItem = ({
  targetId,
  nickname,
  animalType,
  profileImageUrl,
  isFollow,
}: RunnerItemProps) => {
  const [followState, setFollowState] = useState(isFollow ?? false)

  return (
    <div className="flex items-center rounded-xl bg-white p-4">
      <div className="flex w-full items-center gap-3">
        <Image
          src={profileImageUrl}
          alt=""
          width={52}
          height={52}
          className="size-14 rounded-full object-cover"
        />

        <div className="flex flex-1 flex-col gap-0.5">
          <Link
            href={`/profile/${targetId}`}
            className="line-clamp-1 w-fit cursor-pointer break-all">
            {nickname}
          </Link>
          <AnimalBadge animal={animalType} />
        </div>

        {isFollow === null ? (
          <div className="rounded-xl bg-neutral-200 px-1 text-white">나</div>
        ) : (
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
