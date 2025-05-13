import { updateProfile } from "@/services/member/api"
import { ProfileForEditRequest } from "@/types/member"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

const useEditProfile = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: ({
      data,
      memberId,
    }: {
      data: ProfileForEditRequest
      memberId: number
    }) => updateProfile(data),
    mutationKey: ["edit-profile"],
    onSuccess: async (_, variables) => {
      // 이후 프로필 편집 페이지 진입 시, 새롭게 리패치하도록 무효화
      queryClient.invalidateQueries({
        queryKey: ["profile-for-edit"],
      })

      // 닉네임이 변경됐을 수도 있으므로 리이슈를 통해 jwt 토큰 갱신
      await fetch("/api/reissue")

      router.replace(`/profile/${variables.memberId}`)
    },
  })
}

export default useEditProfile
