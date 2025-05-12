import { patchFollow, postFollow } from "@/services/members/api"
import { useMutation } from "@tanstack/react-query"

interface UseFollowProps {
  onChange: (followState: boolean) => void
}

const useFollow = ({ onChange }: UseFollowProps) => {
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
    onSuccess: (_, variables) => {
      onChange(!variables.followState)
    },
  })
}

export default useFollow
