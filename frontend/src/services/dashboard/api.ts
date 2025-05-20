import { getApiServer } from "@/lib/api-server"
import type {
  PersonalDailyCourseResponse,
  PersonalDailyRunningTimeResponse,
  PersonalDailyTileResponse,
  PersonalDashboardResponse,
  PersonalTileChangeRateResponse,
  TeamActivityChangeRequest,
  TeamActivityChangeResponse,
} from "@/types/dashboard/dashboard.type"

// 개인 대시보드 데이터 가져오기
export const getDashboardData = async (params: {
  year: number
  month: number
}) => {
  const nextApiClient = await getApiServer()
  return nextApiClient.get<PersonalDashboardResponse>("/dashboards/members", {
    params,
  })
}

// 개인 일별 달린 시간 조회
export const getDailyTime = async (params: { year: number; month: number }) => {
  const nextApiClient = await getApiServer()

  return nextApiClient.get<PersonalDailyRunningTimeResponse[]>(
    "/dashboards/members/daily-running-times",
    { params },
  )
}

// 개인 일별 타일 조회
export const getDailyTile = async (params: { year: number; month: number }) => {
  const nextApiClient = await getApiServer()

  return nextApiClient.get<PersonalDailyTileResponse[]>(
    "/dashboards/members/daily-tiles-counts",
    { params },
  )
}

// 개인 일별 완료한 코스 조회
export const getDailyCourse = async (params: {
  year: number
  month: number
}) => {
  const nextApiClient = await getApiServer()

  return nextApiClient.get<PersonalDailyCourseResponse[]>(
    "/dashboards/members/daily-courses",
    { params },
  )
}

// 개인 타일 변화율 조회
export const getTileChangeRate = async (params: {
  period: "WEEKLY" | "DAILY"
}) => {
  const nextApiClient = await getApiServer()

  return nextApiClient.get<PersonalTileChangeRateResponse>(
    "/dashboards/members/tile-changes",
    { params },
  )
}

// 팀 대시보드 데이터 가져오기
// 1. 우리팀 조디악, 랭킹, 타일
// 2. 우리팀 Top3 멤버 조회
// 3. 전체 상위 팀 조회

// 5. 우리팀 활동량 변화
export const getTeamActivityChange = async (
  params: TeamActivityChangeRequest,
) => {
  const nextApiClient = await getApiServer()

  return nextApiClient.get<TeamActivityChangeResponse>(
    "/dashboards/teams/courses",
    {
      params: params ? { ...params } : undefined,
    },
  )
}
