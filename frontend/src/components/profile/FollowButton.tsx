"use client"

import useFollow from "@/hooks/profile/useFollow"
import Button from "../common/Button"
import { Dispatch, MouseEvent, SetStateAction } from "react"

interface FollowButtonProps {
  targetId: number
  className?: string
  followState: boolean
  onClick: Dispatch<SetStateAction<boolean>>
}

const FollowButton = ({
  targetId,
  followState,
  className,
  onClick,
}: FollowButtonProps) => {
  const { mutate: follow } = useFollow({
    onClick,
  })

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    follow({ targetId, followState })
  }

  return (
    <Button className={className} onClick={handleClick}>
      {followState ? "언팔로우" : "팔로우"}
    </Button>
  )
}

export default FollowButton
