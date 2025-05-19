"use server"

import { getApiServer } from "@/lib/api-server"
import { ProfileResponse } from "@/types/member/member.type"

// 프로필 조회
export const getProfile = async (memberId: number) => {
  const apiServer = await getApiServer()
  return await apiServer.get<ProfileResponse>(`/members/${memberId}/profiles`)
}
