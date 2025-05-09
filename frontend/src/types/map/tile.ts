import { Coordinates } from "@/types/map/navermaps"

export interface Tile {
  sw: Coordinates
  ne: Coordinates
  zordiacId: number
}
