import apiClient from "@/lib/http-common"
import {
  TeamClusterResponse,
  TileMapClusterResponse,
  TileMapResponse,
  ZodiacTeamSituationResponse,
} from "@/types/map/tile"

// 개인 타일 지도 조회
export const getPersonalTileMap = async (memberId: string) => {
  const response = await apiClient.get<TileMapResponse>(
    `tiles/members/${memberId}`,
  )
  return response.data
}

// 전체 점령 지도 확인 (팀 상관없이 좌쵸 근처에 대한 타일의 정보 가져옴)
export const getTeamTileMap = async (params: {
  swLat: number
  swLng: number
  neLat: number
  neLng: number
}) => {
  const response = await apiClient.get<TileMapResponse>("tiles/teams/new", {
    params,
  })
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

  return response.data
}

// 특정 팀 점령 지도 확인
export const getOneTeamTileMap = async (
  zodiacId: number,
  params: { swLat: number; swLng: number; neLat: number; neLng: number },
) => {
  const response = await apiClient.get<TileMapResponse>(
    `tiles/teams/${zodiacId}/new`,
    {
      params,
    },
  )
  return response.data
}

// 특정 팀 점령 지도 클러스터 확인
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

// 1등 팀과 우리팀의 정보를 반환 (/tiles/teams/{zodiacId}/situation)
export const getZodiacTeamSituation = async (zodiacId: string) => {
  const response = await apiClient.get<ZodiacTeamSituationResponse>(
    `tiles/teams/${zodiacId}/situation`,
  )
  return response.data
}

// 좌표 근처의 클러스터링(타일일) 정보 가져옴 (/tiles/teams/cluster)
export const getTeamCluster = async (params: {
  lat: number
  lng: number
  zoomLevel: number
}) => {
  const response = await apiClient.get<TeamClusterResponse>(
    `tiles/teams/cluster`,
    {
      params,
    },
  )
  return response.data
}
