import { updateProfile } from "@/services/member/api"
import { ProfileForEditRequest } from "@/types/member/member.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

const useEditProfile = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: ({
      data,
      memberId,
      isNicknameChanged,
    }: {
      data: ProfileForEditRequest
      memberId: number
      isNicknameChanged: boolean
    }) => updateProfile(data),
    mutationKey: ["edit-profile"],
    onSuccess: async (data, variables) => {
      // 이후 프로필 편집 페이지 진입 시, 새롭게 리패치하도록 무효화
      queryClient.invalidateQueries({
        queryKey: ["profile-for-edit"],
      })

      // 닉네임을 변경했었다면 리이슈를 호출하여 JWT 속 페이로드 갱신
      if (variables.isNicknameChanged) {
        await fetch("/api/reissue", {
          method: "POST",
        })
      }

      router.replace(`/profile/${variables.memberId}`)
    },
  })
}

export default useEditProfile
