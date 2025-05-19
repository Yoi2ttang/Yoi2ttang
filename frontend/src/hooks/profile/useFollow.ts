import { patchFollow, postFollow } from "@/services/member/api"
import { useMutation } from "@tanstack/react-query"

interface UseFollowProps {
  onClick: (followState: boolean) => void
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
    onSuccess: (_, variables) => {
      onClick(!variables.followState)
    },
  })
}

export default useFollow
