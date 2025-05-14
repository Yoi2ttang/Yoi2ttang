import apiClient from "@/lib/http-common"
import {
  TeamClusterResponse,
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

// 전체 점령 지도
export const getTeamTileMap = async (params: { lat: number; lng: number }) => {
  const response = await apiClient.get<TileMapResponse>("tiles/teams", {
    params,
  })
  return response.data
}

// 특정 팀의 점령 지도 확인 (/tiles/teams/{zodiacId})
export const getZodiacTeamTileMap = async (
  zodiacId: string,
  params: {
    lat: number
    lng: number
  },
) => {
  const response = await apiClient.get<TileMapResponse>(
    `tiles/teams/${zodiacId}`,
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

// 특정 팀의 점령된 클러스터링(타일) 수 반환 (/tiles/teams/cluster/{zodiacId})
export const getZodiacTeamCluster = async (
  zodiacId: string,
  params: {
    lat: number
    lng: number
    zoomLevel: number
  },
) => {
  const response = await apiClient.get<TeamClusterResponse>(
    `tiles/teams/cluster/${zodiacId}`,
    { params },
  )
  return response.data
}
