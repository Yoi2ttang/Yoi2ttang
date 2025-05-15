import { Coordinates } from "@/types/map/navermaps"

export interface Tile {
  geoHash: string
  sw: Coordinates
  ne: Coordinates
  zordiacId: number
}
