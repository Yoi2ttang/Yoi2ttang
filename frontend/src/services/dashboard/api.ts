import { getApiServer } from "@/lib/api-server"
import type {
  PersonalDailyCourseResponse,
  PersonalDailyRunningDistanceResponse,
  PersonalDailyRunningTimeResponse,
  PersonalDailyTileResponse,
  PersonalDashboardResponse,
  PersonalTileChangeRateResponse,
} from "@/types/dashboard/dashboard.type"

// 개인 대시보드 데이터 가져오기
export const getDashboardData = async () => {
  const nextApiClient = await getApiServer()

  const response =
    await nextApiClient.get<PersonalDashboardResponse>("/dashboard/member")
  return response
}

// 개인 일별 달린 거리 조회
export const getDailyDistance = async () => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<
    PersonalDailyRunningDistanceResponse[]
  >("/dashboard/member/daily-distances")
  return response
}

// 개인 일별 달린 시간 조회
export const getDailyTime = async (params: { year: number; month: number }) => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<PersonalDailyRunningTimeResponse[]>(
    "/dashboard/member/daily-running-times",
    { params },
  )
  return response
}

// 개인 일별 타일 조회
export const getDailyTile = async (params: { year: number; month: number }) => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<PersonalDailyTileResponse[]>(
    "/dashboard/member/daily-tiles-count",
    { params },
  )
  return response
}

// 개인 일별 완료한 코스 조회
export const getDailyCourse = async (params: {
  year: number
  month: number
}) => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<PersonalDailyCourseResponse[]>(
    "/dashboard/member/daily-course",
    { params },
  )
  return response
}

// 개인 타일 변화율 조회
export const getTileChangeRate = async (params: { period: "WEEKLY" }) => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<PersonalTileChangeRateResponse>(
    "/dashboard/member/tile-change",
    { params },
  )
  return response
}

// 팀 대시보드 데이터 가져오기
// 1. 우리팀 조디악, 랭킹, 타일
// 2. 우리팀 Top3 멤버 조회
// 3. 전체 상위 팀 조회

// 5. 우리팀 활동량 변화
