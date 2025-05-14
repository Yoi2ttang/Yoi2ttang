"use client"

import { throttle } from "lodash-es"
import Button from "../common/Button"
import useFollow from "@/hooks/profile/useFollow"
import { useMemo } from "react"

interface FollowButtonProps {
  targetId: number
  className?: string
  followState: boolean
  onChange: (followState: boolean) => void
  onClick?: () => void
}

const FollowButton = ({
  targetId,
  followState,
  className,
  onChange,
  onClick,
}: FollowButtonProps) => {
  const { mutate: follow } = useFollow({
    onChange,
  })

  const handleClick = () => {
    follow({ targetId, followState })
  }

  return (
    <Button className={className} onClick={handleClick}>
      {followState ? "언팔로우" : "팔로우"}
    </Button>
  )
}

export default FollowButton
