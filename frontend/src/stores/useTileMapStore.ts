import { NaverMap } from "@/types/map/navermaps"
import { Tile, TileCluster } from "@/types/map/tile"
import { create } from "zustand"

interface TileMapStore {
  tileMapRef: NaverMap | null
  tiles: Tile[]
  cluster: TileCluster[]
  setTiles: (tiles: Tile[] | ((tiles: Tile[]) => Tile[])) => void
  setCluster: (
    cluster: TileCluster[] | ((cluster: TileCluster[]) => TileCluster[]),
  ) => void
  setTileMapRef: (tileMapRef: NaverMap | null) => void
}

const useTileMapStore = create<TileMapStore>((set, get) => ({
  tileMapRef: null,
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
  setTileMapRef: (tileMapRef: NaverMap | null) => set({ tileMapRef }),
}))

export default useTileMapStore
