import { Tile, TileCluster } from "@/types/map/tile"
import { create } from "zustand"

interface TileMapStore {
  tiles: Tile[]
  cluster: TileCluster[]
  setTiles: (tiles: Tile[] | ((tiles: Tile[]) => Tile[])) => void
  setCluster: (
    cluster: TileCluster[] | ((cluster: TileCluster[]) => TileCluster[]),
  ) => void
}

const useTileMapStore = create<TileMapStore>((set, get) => ({
  tiles: [],
  cluster: [],
  setTiles: (tiles: Tile[] | ((tiles: Tile[]) => Tile[])) =>
    set({
      tiles: typeof tiles === "function" ? tiles(get().tiles) : tiles,
    }),
  setCluster: (
    cluster: TileCluster[] | ((cluster: TileCluster[]) => TileCluster[]),
  ) =>
    set({
      cluster: typeof cluster === "function" ? cluster(get().cluster) : cluster,
    }),
}))

export default useTileMapStore
