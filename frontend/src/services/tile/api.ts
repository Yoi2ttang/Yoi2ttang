import { getApiServer } from "@/lib/api-server"
import apiClient from "@/lib/http-common"
import { TileMapResponse } from "@/types/dashboard/dashboard.type"
import { TileMapClusterResponse } from "@/types/map/tile"

// 개인 타일 지도 조회
export const getPersonalTileMap = async (memberId: string) => {
  const nextApiClient = await getApiServer()

  const response = await nextApiClient.get<TileMapResponse>(
    `tiles/members/${memberId}`,
  )
  return response
}

// 전체 점령 지도 확인 (팀 상관없이 좌쵸 근처에 대한 타일의 정보 가져옴)
export const getTeamTileMap = async (params: { lat: number; lng: number }) => {
  const response = await apiClient.get<TileMapResponse>("tiles/teams", {
    params,
  })
  console.log(response.data)
  return response.data
}

// 전체 점령 지도 클러스터 확인
export const getTeamTileMapCluster = async (params: {
  lat: number
  lng: number
  zoomLevel: number
}) => {
  const response = await apiClient.get<TileMapClusterResponse>(
    "tiles/teams/cluster",
    { params },
  )

  console.log(response.data)
  return response.data
}

// 특정 점령 지도 확인
export const getOneTeamTileMap = async (
  zodiacId: number,
  params: { lat: number; lng: number },
) => {
  const response = await apiClient.get<TileMapResponse>(
    `tiles/teams/${zodiacId}`,
    {
      params,
    },
  )
  return response.data
}

// 특정 점령 지도 클러스터 확인
export const getOneTeamTileMapCluster = async (
  zodiacId: number,
  params: { lat: number; lng: number; zoomLevel: number },
) => {
  const response = await apiClient.get<TileMapClusterResponse>(
    `tiles/teams/cluster/${zodiacId}`,
    { params },
  )

  return response.data
}
