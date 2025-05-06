import apiClient from "@/lib/http-common"
import { LoginResponse, SignUpData } from "@/types/auth"

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

export const postLogin = async (code: string): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login/kakao", {
    code,
    environment: "WEB",
  })
  return response.data
}
