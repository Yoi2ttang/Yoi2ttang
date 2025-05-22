import { patchFollow, postFollow } from "@/services/member/api"
import { useMutation } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"

interface UseFollowProps {
  onClick: Dispatch<SetStateAction<boolean>>
}

const useFollow = ({ onClick }: UseFollowProps) => {
  return useMutation({
    mutationFn: ({
      targetId,
      followState,
    }: {
      targetId: number
      followState: boolean
    }) => {
      if (followState) {
        return patchFollow(targetId)
      }
      return postFollow(targetId)
    },
    onSuccess: () => {
      onClick((prev) => !prev)
    },
  })
}

export default useFollow
