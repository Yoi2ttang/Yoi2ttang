import { getApiServer } from "@/lib/api-server"
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
  zodiacId: string
  limit: number
}) => {
  const nextApiClient = await getApiServer()

  return nextApiClient.get<TeamRankingResponse>("/tiles/rankings/previews", {
    params,
  })
}

// 간지별 기여도 랭킹 확인
export const getZodiacContributionRanking = async (zodiacId: string) => {
  const nextApiClient = await getApiServer()

  return nextApiClient.get<ZodiacContributionRankingResponse>(
    `/tiles/rankings/${zodiacId}`,
  )
}

// 나의 팀 정보 조회
export const getMyTeamInfo = async () => {
  const nextApiClient = await getApiServer()

  return nextApiClient.get<MyTeamInfoResponse>("/members/me/temp")
}
