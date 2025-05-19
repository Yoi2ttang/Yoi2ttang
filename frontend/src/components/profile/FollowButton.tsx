"use client"

import useFollow from "@/hooks/profile/useFollow"
import Button from "../common/Button"

interface FollowButtonProps {
  targetId: number
  className?: string
  followState: boolean
  onClick: (followState: boolean) => void
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

  const handleClick = () => {
    follow({ targetId, followState })
    onClick(followState)
  }

  return (
    <Button className={className} onClick={handleClick}>
      {followState ? "언팔로우" : "팔로우"}
    </Button>
  )
}

export default FollowButton
