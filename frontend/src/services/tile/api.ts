import { getApiServer } from "@/lib/api-server"
import { TileMapResponse } from "@/types/dashboard/dashboard.type"

// 개인 타일 지도 조회
export const getPersonalTileMap = async () => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<TileMapResponse>("tiles/member")
  return response
}

// 4. 우리팀 타일 지도
export const getTeamTileMap = async () => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<TileMapResponse>("tiles/team")
  return response
}
