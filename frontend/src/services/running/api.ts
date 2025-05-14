import apiClient from "@/lib/http-common"
import type { TeamSituationResponse } from "@/types/running/running.type"

// 점령 현황 데이터 가져오기
export const getTeamSituation = async (zodiacId: number) => {
  const response = await apiClient.get<TeamSituationResponse>(
    `/tiles/teams/${zodiacId}/situation`,
  )

  return response.data
}
