import apiClient from "@/lib/http-common"
import { SignUpData } from "@/types/auth"

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

export const postLogin = async (code: string, environment: string = "WEB") => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/kakao`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        code,
        environment,
      }),
    },
  )
}
