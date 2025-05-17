import { Coordinates } from "@/types/map/navermaps"

export interface Tile {
  geoHash: string
  sw: Coordinates
  ne: Coordinates
  zordiacId: number
}

export interface TileCluster {
  zodiacId: number
  count: number
  geoPoint: {
    lat: number
    lng: number
  }
}

export interface TileMapClusterResponse {
  tileClusterGetResponseList: TileCluster[]
}
