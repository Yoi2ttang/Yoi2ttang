import { updateProfile } from "@/services/members/api"
import { ProfileForEditRequest } from "@/types/member"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useEditProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProfileForEditRequest) => updateProfile(data),
    mutationKey: ["edit-profile"],
    onSuccess: () => {
      // 이후 프로필 편집 페이지 진입 시, 새롭게 리패치하도록 무효화
      queryClient.invalidateQueries({
        queryKey: ["profile-for-edit"],
      })
    },
  })
}

export default useEditProfile
