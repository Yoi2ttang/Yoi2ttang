import { getApiServer } from "@/lib/api-server"

// 12간지 팀 별 랭킹
export const getTeamRanking = async () => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get("tiles/rankings")
  return response
}

// 팀 별 랭킹 미리보기
export const getTeamRankingPreview = async () => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get("tiles/rankings/preview")
  return response
}

// 간지별 기여도 랭킹 확인
export const getZodiacContributionRanking = async (zodiacId: string) => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get(`tiles/rankings/${zodiacId}`)
  return response
}
