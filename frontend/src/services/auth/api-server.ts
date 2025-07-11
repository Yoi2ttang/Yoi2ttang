"use server"

import { getApiServer } from "@/lib/api-server"
import { LoginResponse, SignUpData } from "@/types/auth/auth.type"

export const postSignup = async (signupData: SignUpData) => {
  const apiServer = await getApiServer()
  return await apiServer.post<LoginResponse>("/auth/signup/kakao", {
    body: {
      ...signupData,
      birth: `${signupData.birth.year}-${signupData.birth.month.padStart(2, "0")}-${signupData.birth.day.padStart(2, "0")}`,
    },
  })
}

export const postLogin = async (
  code: string,
  environment: string = process.env.NODE_ENV === "development"
    ? "LOCAL_WEB"
    : "WEB",
) => {
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
