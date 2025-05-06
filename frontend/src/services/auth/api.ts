import apiClient from "@/lib/http-common"
import { SignUpData } from "@/types/signup/signup"

export const getIsNicknameDuplicated = async (nickname: string) => {
  const response = await apiClient.get(
    `/auth/check-nickname?nickname=${nickname}`,
  )
  return response.data
}

export const postSignup = async (signupData: SignUpData) => {
  const response = await apiClient.post("/auth/signup/kakao", {
    ...signupData,
    birth: `${signupData.birth.year}-${signupData.birth.month}-${signupData.birth.day}`,
  })
  return response.data
}
