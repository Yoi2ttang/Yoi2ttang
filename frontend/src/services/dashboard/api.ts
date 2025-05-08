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
export const getDailyTime = async (year: number, month: number) => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<PersonalDailyRunningTimeResponse[]>(
    "/dashboard/member/daily-running-times",
    { params: { year, month } },
  )
  return response
}

// 개인 일별 타일 조회
export const getDailyTile = async (year: number, month: number) => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<PersonalDailyTileResponse[]>(
    "/dashboard/member/daily-tiles-count",
    { params: { year, month } },
  )
  return response
}

// 개인 일별 완료한 코스 조회
export const getDailyCourse = async (year: number, month: number) => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<PersonalDailyCourseResponse[]>(
    "/dashboard/member/daily-course",
    { params: { year, month } },
  )
  return response
}

// 개인 타일 변화율 조회
export const getTileChangeRate = async (year: number, month: number) => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<PersonalTileChangeRateResponse>(
    "/dashboard/member/tile-change",
    { params: { year, month } },
  )
  return response
}
