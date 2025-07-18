import apiClient from "@/lib/http-common"
import type {
  PostLocationRequest,
  StartRunningRequest,
  StartRunningResponse,
  TeamSituationResponse,
} from "@/types/running/running.type"

// 점령 현황 데이터 가져오기
export const getTeamSituation = async (zodiacId: number) => {
  const response = await apiClient.get<TeamSituationResponse>(
    `/tiles/teams/${zodiacId}/situation`,
  )

  return response.data
}

// 러닝 시작하기
export const postStartRunning = async (payload: StartRunningRequest) => {
  const response = await apiClient.post<StartRunningResponse>(
    "/runnings/free",
    payload,
  )

  return response.data
}

// 러닝 끝내기
export const updateEndRunning = async (runningId: number, endTime: string) => {
  const response = await apiClient.patch(`/runnings/${runningId}/end`, {
    endTime,
  })

  return response.data
}

// 러닝 중 위치 보내기
export const postLocation = async (payload: PostLocationRequest) => {
  const response = await apiClient.post("/runnings/locations", payload)

  return response.data
}
