export interface TeamInfo {
  rank: number
  zodiacId: number
  tileCount: number
}

// 점령 현황 가져오기 응답 타입
export interface TeamSituationResponse {
  No1Team: TeamInfo
  myTeam: TeamInfo
  rankGap: number
}

export interface StartRunningRequest {
  lat: number
  lng: number
  currentTime: string
}

export interface StartRunningResponse {
  runningId: number
  message: string
}
