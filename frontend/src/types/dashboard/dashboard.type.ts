import { Tile } from "../map/tile"

export interface PersonalStatistics {
  totalTime: number
  totalLength: number
  completedChallenge: number
  totalTile: number
}

// 개인 대시보드 데이터 가져오기 응답 타입
export interface PersonalDashboardResponse {
  memberId: number
  duration: number
  totalDistance: number
  runningDuration: {
    hour: number
    minute: number
    seconds: number
  }
  occupiedTileCount: number
  completeCourseCount: number
}

// 개인 일별 달린 거리 조회 응답 타입
export interface PersonalDailyRunningDistanceResponse {
  date: string
  distance: number
}

// 개인 일별 달린 시간 조회 응답 타입
export interface PersonalDailyRunningTimeResponse {
  date: string
  runningDuration: {
    hour: number
    minute: number
    seconds: number
  }
}

// 개인 일별 타일 조회 응답 타입
export interface PersonalDailyTileResponse {
  date: string
  occupiedTileCount: number
}

// 개인 일별 완료한 코스 조회 응답 타입
export interface PersonalDailyCourseResponse {
  date: string
  completeCourseCount: number
}

// 개인 타일 변화율 조회 응답 타입
export interface PersonalTileChangeRateResponse {
  changeRate: number
  changeDirection: "INCREASE" | "DECREASE" | "NO_CHANGE"
}

// 팀 타일 지도 응답 타입
export interface TileMapResponse {
  tileGetResponseList: Tile[]
}

// 팀 활동량 변화 요청 타입
export interface TeamActivityChangeRequest {
  zodiacId: number
  startDate: string // "2025-05-01"
  endDate: string
  period: "DAY" | "WEEK" | "MONTH" | "YEAR"
  order: "ASC" | "DESC"
}

// 팀 활동량 변화 응답 타입
export interface TeamActivityChangeResponse {
  zodiacId: number
  pointList: {
    count: number
    date: string
  }[]
}
