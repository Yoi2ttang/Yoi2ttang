import { getApiServer } from "@/lib/api-server"
import apiClient from "@/lib/http-common"
import {
  MyTeamInfoResponse,
  TeamRankingResponse,
  ZodiacContributionRankingResponse,
} from "@/types/ranking"

// 12간지 팀 별 랭킹
export const getTeamRanking = async () => {
  const nextApiClient = await getApiServer()

  return await nextApiClient.get<TeamRankingResponse>("/tiles/rankings")
}

// 팀 별 랭킹 top 3
export const getTeamRankingPreview = async (params: {
  zodiacId: number
  limit: number
}) => {
  const nextApiClient = await getApiServer()

  return nextApiClient.get<TeamRankingResponse>("/tiles/rankings/previews", {
    params,
  })
}

// 간지별 기여도 랭킹 확인
export const getZodiacContributionRanking = async (
  zodiacId: number,
  params: {
    date: string
    lastCount?: number
    lastMemberId?: number
    size?: number
  },
) => {
  // 브라우저 환경에서 다른 호출
  if (typeof window !== "undefined") {
    const response = await apiClient.get(`/tiles/rankings/${zodiacId}`, {
      params,
    })
    return response.data
  }
}

// 간지별 기여도 랭킹 확인 :서버 환경에서 호출
export const getZodiacContributionRankingServer = async (
  zodiacId: number,
  params: {
    date: string
    lastCount?: number
    lastMemberId?: number
    size?: number
  },
) => {
  const nextApiClient = await getApiServer()

  return nextApiClient.get<ZodiacContributionRankingResponse>(
    `/tiles/rankings/${zodiacId}`,
    {
      params,
    },
  )
}

// 나의 팀 정보 조회
export const getMyTeamInfo = async () => {
  const nextApiClient = await getApiServer()

  return nextApiClient.get<MyTeamInfoResponse>("/members/me/temp")
}
