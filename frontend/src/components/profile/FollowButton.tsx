"use client"

import Button from "../common/Button"

interface FollowButtonProps {
  targetId: number
}

const FollowButton = ({ targetId }: FollowButtonProps) => {
  const handleClick = () => {}

  return (
    <Button className="rounded-lg px-3 py-1" onClick={handleClick}>
      팔로우
    </Button>
  )
}

export default FollowButton
