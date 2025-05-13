import { getApiServer } from "@/lib/api-server"
import apiClient from "@/lib/http-common"
import { LoginResponse, SignUpData } from "@/types/auth"

export const getIsNicknameDuplicated = async (nickname: string) => {
  const response = await apiClient.get(
    `/auth/check-nickname?nickname=${nickname}`,
  )
  return response.data
}

export const postSignup = async (signupData: SignUpData) => {
  const apiServer = await getApiServer()
  return await apiServer.post<LoginResponse>("/auth/signup/kakao", {
    body: {
      ...signupData,
      birth: `${signupData.birth.year}-${signupData.birth.month.padStart(2, "0")}-${signupData.birth.day.padStart(2, "0")}`,
    },
  })
}

export const postLogin = async (code: string, environment: string = "WEB") => {
  const apiServer = await getApiServer()
  return await apiServer.post<LoginResponse>("/auth/login/kakao", {
    body: {
      code,
      environment,
    },
  })
}

export const postReissue = async () => {
  const apiServer = await getApiServer()
  return await apiServer.post<LoginResponse>("/auth/reissue")
}

export const postLogout = async () => {
  const apiServer = await getApiServer()
  return await apiServer.post("/auth/logout")
}
