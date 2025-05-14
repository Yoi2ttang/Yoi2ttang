import { getApiServer } from "@/lib/api-server"
import apiClient from "@/lib/http-common"
import { TileMapResponse } from "@/types/dashboard/dashboard.type"

// 개인 타일 지도 조회
export const getPersonalTileMap = async (memberId: string) => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<TileMapResponse>(
    `tiles/members/${memberId}`,
  )
  return response
}

// 4. 우리팀 타일 지도
export const getTeamTileMap = async (params: { lat: number; lng: number }) => {
  const response = await apiClient.get<TileMapResponse>("tiles/teams", {
    params,
  })
  return response.data
}
