import { Coordinates } from "@/types/map/navermaps"

export interface Tile {
  geoHash: string
  sw: Coordinates
  ne: Coordinates
  zordiacId: number
}

// 팀 타일 지도 응답 타입
export interface TileMapResponse {
  tileGetResponseList: Tile[]
}

//(/tiles/teams/{zodiacId})
export type ZodiacTeamTileMapResponse = TileMapResponse

//(/tiles/teams/{zodiacId}/situation)
export interface ZodiacTeamSituationResponse {
  No1Team: {
    rank: number
    zodiacId: number
    tileCount: number
  }
  myTeam: {
    rank: number
    zodiacId: number
    tileCount: number
  }
  rankGap: number
}

export interface TileCluster {
  zodiacId: number
  geoPoint: {
    lat: number
    lng: number
  }
  count: number
}

//(/tiles/teams/cluster)
export interface TeamClusterResponse {
  tileClusterGetResponseList: TileCluster[]
}

//(/tiles/teams/cluster/{zodiacId})
export type ZodiacTeamClusterResponse = TeamClusterResponse

export interface TileMapClusterResponse {
  tileClusterGetResponseList: TileCluster[]
}

export enum TileViewOption {
  MY,
  TEAM,
  ALL,
  UNCLAIMED,
}
