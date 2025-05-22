"use server"

import { Payload } from "@/types/auth/auth.type"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"

// accessToken 열어서 페이로드 확인 후 데이터 반환
export const getPayloadFromAccessToken = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return null
  }

  const decoded = jwtDecode<Payload>(accessToken)

  if (!decoded) {
    return null
  }

  return decoded
}
